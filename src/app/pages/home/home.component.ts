import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = false;

  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }
}
