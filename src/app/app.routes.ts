import { Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { PedidosComponent } from './components/views/pedidos/pedidos.component';
import { ProdutosComponent } from './components/views/produtos/produtos.component';
import { ClientesComponent } from './components/views/clientes/clientes.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
    data: { animation: 'login' }
},{
    path: 'dash',
    component: PedidosComponent,
    data: { animation: 'dashboard' },
    canActivate: [AuthGuard]
},{
    path: 'products',
    component: ProdutosComponent,
    data: { animation: 'products' },
    canActivate: [AuthGuard]
   
},{
    path: 'clients',
    component: ClientesComponent,
    data: { animation: 'clients' },
    canActivate: [AuthGuard]
},{ path: '**', redirectTo: '' }];
