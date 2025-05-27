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
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { title: 'Bancos', icon: 'account_balance', route: 'bancos' },
    { title: 'Usuarios', icon: 'people', route: 'usuarios' }
  ];

  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([`/home/${route}`]);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
