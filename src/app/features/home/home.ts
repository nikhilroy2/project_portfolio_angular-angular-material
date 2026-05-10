import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { AppIcon } from '../../shared/icons/app-icon';
import { MATERIAL_IMPORTS } from '../../shared/material/material-imports';

interface SidebarChild {
  label: string;
  path: string;
  icon: string;
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

interface SummaryCard {
  label: string;
  value: string;
  helper: string;
  tone: 'blue' | 'green' | 'purple' | 'amber';
  icon: string;
}

interface InsightItem {
  title: string;
  description: string;
  icon: string;
}

interface TimelineItem {
  label: string;
  date: string;
  status: string;
  icon: string;
}

interface GraphCard {
  title: string;
  value: string;
  helper: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'amber';
  points: string;
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
        { label: 'Subportfolios', path: '/subportfolios', icon: 'layers' },
        { label: 'Programs', path: '/programs', icon: 'apps' },
        { label: 'Projects', path: '/projects', icon: 'article' },
        { label: 'Orders', path: '/orders', icon: 'check_circle' },
        { label: 'Ideas', path: '/ideas', icon: 'info' },
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

  protected readonly detailSummaryCards: SummaryCard[] = [
    { label: 'Current Stage', value: 'Order', helper: 'Ready for closing report', tone: 'blue', icon: 'article' },
    { label: 'Approval Status', value: 'Approved', helper: '3 workflow steps completed', tone: 'green', icon: 'check_circle' },
    { label: 'Open Documents', value: '5', helper: 'Project files available', tone: 'purple', icon: 'menu_book' },
  ];

  protected readonly detailInsights: InsightItem[] = [
    {
      title: 'Next best action',
      description: 'Review the closing report and prepare the final project package.',
      icon: 'chevron_right',
    },
    {
      title: 'Workflow health',
      description: 'All mandatory stakeholders have completed their approvals.',
      icon: 'check_circle',
    },
  ];

  protected readonly detailTimeline: TimelineItem[] = [
    { label: 'Idea created', date: '11 Nov 2025', status: 'Captured', icon: 'info' },
    { label: 'Order reviewed', date: '11 Nov 2025', status: 'Approved', icon: 'check_circle' },
    { label: 'Closing report', date: 'Pending', status: 'Next', icon: 'article' },
  ];

  protected readonly detailGraphCards: GraphCard[] = [
    {
      title: 'Document Readiness',
      value: '80%',
      helper: '4 of 5 documents are ready for review',
      icon: 'menu_book',
      tone: 'blue',
      points: '4,46 22,34 40,38 58,22 76,18 94,12',
    },
    {
      title: 'Approval Coverage',
      value: '100%',
      helper: 'PMO, Sponsor, and FICO approvals are complete',
      icon: 'check_circle',
      tone: 'green',
      points: '4,42 22,28 40,24 58,16 76,16 94,10',
    },
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

  protected readonly projectSummaryCards: SummaryCard[] = [
    { label: 'Open Projects', value: '01', helper: 'Currently in review', tone: 'blue', icon: 'layers' },
    { label: 'Submitted', value: '01', helper: 'Waiting for PMO action', tone: 'purple', icon: 'article' },
    { label: 'Approved', value: '01', helper: 'Sponsor step completed', tone: 'green', icon: 'check_circle' },
    { label: 'Priority', value: 'P1', helper: 'Development project', tone: 'amber', icon: 'pie_chart' },
  ];

  protected readonly projectInsights: InsightItem[] = [
    {
      title: 'Review focus',
      description: 'PMO needs to validate ownership, priority, and submission details before moving forward.',
      icon: 'settings',
    },
    {
      title: 'Portfolio signal',
      description: 'The request is open and already has sponsor approval, so the next step is operational review.',
      icon: 'check_circle',
    },
    {
      title: 'Decision path',
      description: 'Use the action selector to move the item from submitted review toward final decision.',
      icon: 'chevron_right',
    },
  ];

  protected readonly projectGraphCards: GraphCard[] = [
    {
      title: 'Review Velocity',
      value: '+24%',
      helper: 'Faster movement after sponsor approval',
      icon: 'pie_chart',
      tone: 'green',
      points: '4,44 20,39 36,42 52,28 68,22 84,15 96,10',
    },
    {
      title: 'Decision Queue',
      value: '01',
      helper: 'One project waiting for PMO decision',
      icon: 'article',
      tone: 'purple',
      points: '4,28 20,30 36,24 52,32 68,22 84,24 96,18',
    },
    {
      title: 'Priority Signal',
      value: 'P1',
      helper: 'High priority development project',
      icon: 'settings',
      tone: 'amber',
      points: '4,40 20,38 36,32 52,26 68,20 84,16 96,12',
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
