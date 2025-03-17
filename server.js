const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({ static: './public' });
const multer = require('multer');
const path = require('path');
const fs = require('fs');




// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads/';
    
    // Garante que o diretório exista
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // limite de 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return cb(new Error('Apenas imagens são permitidas!'), false);
    }
    cb(null, true);
  }
});


server.use(middlewares);

// Rota para upload de imagem
server.post('/upload', upload.single('imagem'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.status(201).json({ 
      imageUrl: imageUrl,
      filename: req.file.filename 
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no upload' });
  }
});

// Rota para listar uploads
server.get('/uploads', (req, res) => {
  const db = router.db.getState();
  res.json(db.uploads || []);
});




server.use(router);






const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server está rodando na porta ${PORT}`);
});