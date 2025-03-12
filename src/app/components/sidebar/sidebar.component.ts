import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    MatSidenavModule, 
    MatListModule,    
    MatIconModule,
    RouterOutlet
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { title: 'Bancos', icon: 'account_balance', route: 'bancos' },
    { title: 'Resultados', icon: 'dashboard', route: 'resultados' },
    { title: 'Meu Plano', icon: 'payment', route: 'planos' }
  ];

  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([`/home/${route}`]);
  }
}
