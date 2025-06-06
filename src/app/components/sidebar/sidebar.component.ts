import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    LayoutModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  @Input() isMobile: boolean = false;

  isLoaded: boolean = false;

  menuItems = [
    { title: 'Bancos', icon: 'account_balance', route: 'bancos' },
    { title: 'Usuários', icon: 'people', route: 'usuarios' },
  ];

  private breakpointObserver = inject(BreakpointObserver);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
        this.isLoaded = true; // indica que já processou
      });
  }

  navigate(route: string) {
    this.router.navigate([`/home/${route}`]);

    if (this.isMobile && this.sidenav) {
      this.sidenav.close();
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  openWhatsApp() {
    const whatsappUrl =
      'https://wa.me/5511970489778?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20o%20CleanBot';
    window.open(whatsappUrl, '_blank');
  }
}
