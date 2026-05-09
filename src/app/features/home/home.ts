import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { AppIcon } from '../../shared/icons/app-icon';
import { MATERIAL_IMPORTS } from '../../shared/material/material-imports';

interface SidebarChild {
  label: string;
  path: string;
}

interface SidebarItem {
  label: string;
  icon: string;
  path: string;
  badge?: string;
  trailingIcon?: string;
  children?: SidebarChild[];
}

interface ProjectRow {
  id: number;
  title: string;
  type: string;
  order?: number;
  status: 'Approved';
}

interface WorkflowStep {
  role: string;
  status: string;
  date: string;
}

interface ProjectListRow {
  id: string;
  name: string;
  manager: string;
  role: string;
  document: string;
  priority: number;
  financeBy: string;
  submissionDate: string;
  decision: string;
}

interface ProjectWorkflowStep {
  role: string;
  status: 'Approved' | 'Submitted';
  date?: string;
  owner: string;
  current?: boolean;
}

@Component({
  selector: 'app-home',
  imports: [AppIcon, ...MATERIAL_IMPORTS],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly activeItem = signal('Ideas');
  protected readonly activeDocument = signal('Change Request 1');
  protected readonly activeAction = signal('Actions');
  protected readonly mobileNavOpen = signal(false);
  protected readonly workspaceOpen = signal(true);

  protected readonly sidebarItems: SidebarItem[] = [
    { label: 'Home', icon: 'home', path: '/home' },
    { label: 'Dashboard', icon: 'pie_chart', path: '/dashboard' },
    {
      label: 'My Workspace',
      icon: 'layers',
      path: '/my-workspace',
      children: [
        { label: 'Subportfolios', path: '/subportfolios' },
        { label: 'Programs', path: '/programs' },
        { label: 'Projects', path: '/projects' },
        { label: 'Orders', path: '/orders' },
        { label: 'Ideas', path: '/ideas' },
      ],
    },
    { label: 'Approvals', icon: 'check_circle', path: '/approvals', badge: '33' },
    { label: 'Settings', icon: 'settings', path: '/settings', trailingIcon: 'chevron_right' },
    { label: 'Lessons Learned', icon: 'menu_book', path: '/lessons-learned' },
    { label: 'Help', icon: 'info', path: '/help' },
    { label: 'PL-Checklist', icon: 'article', path: '/pl-checklist' },
  ];

  protected readonly rows: ProjectRow[] = [
    { id: 525, title: '11 Nov 2025 Proj', type: 'Change Request', status: 'Approved' },
    { id: 524, title: 'Idea 39', type: 'Order', order: 2, status: 'Approved' },
  ];

  protected readonly documents = ['Project Outline', 'Project Order', 'Change Request 1', 'Closing Report', 'Idea'];
  protected readonly workflow: WorkflowStep[] = [
    { role: 'PMO', status: 'Approved', date: '11. Nov 2025' },
    { role: 'SPONSOR', status: 'Approved', date: '11. Nov 2025' },
    { role: 'FICO', status: 'Approved', date: '11. Nov 2025' },
  ];

  protected readonly projectListRows: ProjectListRow[] = [
    {
      id: 'lA20',
      name: 'Idea 20',
      manager: 'Manager, Portfolio',
      role: 'PMO',
      document: 'Idea',
      priority: 1,
      financeBy: 'Development Proje',
      submissionDate: '03.07.2025',
      decision: 'Open',
    },
  ];

  protected readonly projectPreviewTabs = ['Idea'];
  protected readonly projectWorkflow: ProjectWorkflowStep[] = [
    {
      role: 'SPONSOR',
      status: 'Approved',
      date: '03. Jul 2025',
      owner: 'Manager, Portfolio',
    },
    {
      role: 'PMO',
      status: 'Submitted',
      owner: 'Manager, Portfolio',
      current: true,
    },
  ];

  constructor() {
    this.syncActiveRoute();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.syncActiveRoute());
  }

  protected isActive(item: SidebarItem): boolean {
    return item.label === this.activeItem() || Boolean(item.children?.some((child) => child.label === this.activeItem()));
  }

  protected selectItem(item: SidebarItem): void {
    if (item.children) {
      this.workspaceOpen.update((open) => !open);
    }

    this.activeItem.set(item.label);
    this.mobileNavOpen.set(false);
    void this.router.navigateByUrl(item.path);
  }

  protected selectChild(child: SidebarChild): void {
    this.activeItem.set(child.label);
    this.mobileNavOpen.set(false);
    void this.router.navigateByUrl(child.path);
  }

  protected toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }

  protected selectDocument(document: string): void {
    this.activeDocument.set(document);
  }

  protected selectAction(action: string): void {
    this.activeAction.set(action);
  }

  private syncActiveRoute(): void {
    const currentPath = this.router.url.split(/[?#]/)[0] || '/ideas';

    for (const item of this.sidebarItems) {
      if (item.path === currentPath) {
        this.activeItem.set(item.label);
        return;
      }

      const matchingChild = item.children?.find((child) => child.path === currentPath);

      if (matchingChild) {
        this.activeItem.set(matchingChild.label);
        this.workspaceOpen.set(true);
        return;
      }
    }
  }
}
