import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/user';
import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { RulesAreasService } from 'app/services/rules-areas.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventComponent implements OnInit {

  @Input() show: boolean = false;
  @Output() close = new EventEmitter<string>();
  formGroup: FormGroup;
  currentUser: User;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private alertService: AlertService,
  private rulesAreasService: RulesAreasService, private router: Router, private route: ActivatedRoute) {
    this.currentUser = this.authenticationService.getCurrentUserValue();
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: ['0', ],
      name: ['', Validators.required],
      type: [''],
      branchId: [''],
      rulesAreaId: [''],
      rulesVersionName: [''],
      areasAndVersions: [''],
      params: ['', ],
      oldParams: [''],
      currentParams:[''],
      events
    });
  }
}

