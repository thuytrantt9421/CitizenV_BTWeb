import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthApiService } from 'api/auth.api.service';

@Directive({
  selector: '[sbForRoles]'
})
export class ForRolesDirective {

  roles: string[] = [];

  @Input()
  set forRoles(roles: string[]|string) {
    if (roles != null) {
      this.roles = Array.isArray(roles) ? roles : [roles];
      this.roles = this.roles.map(r => r.toUpperCase());
    } else {
      this.roles = [];
    }

    this.authApiService.getUserRole$().subscribe(
      role => {
        if (role && !this.roles.includes(role.toUpperCase())) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    );
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authApiService: AuthApiService) { }

}
