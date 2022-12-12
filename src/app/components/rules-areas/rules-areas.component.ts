import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RulesArea } from 'app/models/rulesArea';
import { RulesVersion } from 'app/models/rulesVersion';
import { Table1 } from 'app/models/table1';
import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { RulesAreasService } from 'app/services/rules-areas.service';
import { UserService } from 'app/services/user.service';
import { first } from 'rxjs';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { User } from 'app/models/user';



@Component({
  selector: 'app-rules-areas',
  templateUrl: './rules-areas.component.html',
  styleUrls: ['./rules-areas.component.css']
})
export class RulesAreasComponent implements OnInit  {

  rulesAreas: any;
  rulesVersions: any;
  createFormRulesArea: FormGroup;
  createFormRulesVersion: FormGroup;
  loading = false;
  submittedRulesArea = false;
  submittedRulesVersion = false;

  showAddRulesAreaButton = true;
  showAddRulesAreaFields = false;
  showAddRulesVersionButton = false;
  showAddRulesVersionFields = false;
  rulesVersionsTable: any;
  displayedColumns: string[] = ['area_id', 'area_name', 'version_name', 'published', 'status'];
  dataSource: Table1[];
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private rulesAreasService: RulesAreasService,
    private alertService: AlertService
  ) {
    this.rulesVersionsTable = [];
    this.currentUser = this.authenticationService.getCurrentUserValue();
    rulesAreasService.getAll().subscribe(x =>
      {
        this.rulesAreas = x;
        //console.log('this.rulesAreas ' + this.rulesAreas.length + " " + JSON.stringify(this.rulesAreas));
        for( let i = 0; i < this.rulesAreas.length; ++i) {
          let area_id = this.rulesAreas[i].stringId;
          let name = this.rulesAreas[i].name;

          if (this.rulesAreas[i].rulesVersionDTOS !== null) {
            console.log(JSON.stringify(this.rulesAreas[i].rulesVersionDTOS));
            for (let j = 0; j < this.rulesAreas[i].rulesVersionDTOS.length; ++j) {
              let version_name = this.rulesAreas[i].rulesVersionDTOS[j].name;
              let published = this.rulesAreas[i].rulesVersionDTOS[j].published;
              let status = this.rulesAreas[i].rulesVersionDTOS[j].status;

              let rules_area_id = this.rulesAreas[i].id;
              let rules_version_id = this.rulesAreas[i].rulesVersionDTOS[j].id;
              let table1 = new Table1(area_id, name, version_name, published, status, rules_version_id, rules_area_id);

              console.log('table1' + JSON.stringify(table1));
              this.rulesVersionsTable.push(table1);
            }
          }
        }

        this.dataSource = this.rulesVersionsTable;
        // @ts-ignore
        this.createFormRulesArea.get('selectRulesArea').setValue("-1");

      }
    )
  }


  ngOnInit(): void {
    this.createFormRulesArea = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      text: [''],
      selectRulesArea: [''],
      createRulesAreaVersion: ['']
    });
    this.createFormRulesVersion = this.formBuilder.group({
      name: ['', Validators.required]
    });

  }

  onSubmitRulesArea() {
    this.submittedRulesArea = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createFormRulesArea.invalid) {
      return;
    }

    this.loading = true;
    // @ts-ignore
    let rulesArea: RulesArea = new RulesArea(-1, this.id().value, this.name().value, this.text().value, []);


    this.rulesAreasService.createRulesArea(rulesArea)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('The Rules area has been successfully created', true);
          this.loading = false;
          this.showAddRulesAreaButton = !this.showAddRulesAreaButton;
          this.createFormRulesArea.reset();
          Object.keys(this.createFormRulesArea.controls).forEach(key => {
            // @ts-ignore
            this.createFormRulesArea.get(key).setErrors(null) ;
          })
          this.rulesAreas = [];
          this.rulesAreasService.getAll().subscribe(x =>
            {
              this.rulesAreas = x;
              //console.log('this.rulesAreas ' + this.rulesAreas.length + " " + JSON.stringify(this.rulesAreas));
              for( let i = 0; i < this.rulesAreas.length; ++i) {
                let area_id = this.rulesAreas[i].stringId;
                let name = this.rulesAreas[i].name;

                if (this.rulesAreas[i].rulesVersionDTOS !== null) {
                  console.log(JSON.stringify(this.rulesAreas[i].rulesVersionDTOS));
                  for (let j = 0; j < this.rulesAreas[i].rulesVersionDTOS.length; ++j) {
                    let version_name = this.rulesAreas[i].rulesVersionDTOS[j].name;
                    let published = this.rulesAreas[i].rulesVersionDTOS[j].published;
                    let status = this.rulesAreas[i].rulesVersionDTOS[j].status;

                    let rules_area_id = this.rulesAreas[i].id;
                    let rules_version_id = this.rulesAreas[i].rulesVersionDTOS[j].id;
                    let table1 = new Table1(area_id, name, version_name, published, status, rules_version_id, rules_area_id);
                 this.rulesVersionsTable.push(table1);
                  }
                }
              }

              this.dataSource = this.rulesVersionsTable;
              // @ts-ignore
              this.createFormRulesArea.get('selectRulesArea').setValue("-1");

            }
          )

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  public selectRulesAreaValue() {
    // @ts-ignore
    let key = this.createFormRulesArea.get('selectRulesArea').value;
    console.log('this.rulesAreas.length ' + this.rulesAreas.length);

    console.log('this.rulesAreas ' + JSON.stringify(this.rulesAreas));
    for (let i = 0; i < this.rulesAreas.length; ++i) {
        if(+key === this.rulesAreas[i].id) {
          return this.rulesAreas[i].name;
        }
    }

  }

  // @ts-ignore
  public id() {
    // @ts-ignore
    return this.createFormRulesArea.get('id');
  }


  public name() {
    // @ts-ignore
    return this.createFormRulesArea.get('name');
  }
  public rav_name() {
    // @ts-ignore
    return this.createFormRulesVersion.get('name');
  }
  public text() {
    // @ts-ignore
    return this.createFormRulesArea.get('text');
  }

  switchShowCreateRulesAreaButton() {
    this.showAddRulesAreaButton = !this.showAddRulesAreaButton;
    this.showAddRulesAreaFields = !this.showAddRulesAreaFields;


    this.showAddRulesVersionButton = false;
    this.showAddRulesVersionFields = false;

    // @ts-ignore
    if( this.createFormRulesArea.get('selectRulesArea').value !== "-1" && !this.showAddRulesAreaFields) {
      this.showAddRulesVersionButton = true;
    }

    console.log('this.showAddRulesAreaButton ' + this.showAddRulesAreaButton);
    console.log('this.showAddRulesAreaFields ' + this.showAddRulesAreaFields);
    console.log('this.showAddRulesVersionButton' + this.showAddRulesVersionButton);
    console.log('this.showAddRulesVersionFields' + this.showAddRulesVersionFields);

  }
  switchShowCreateRulesAreaVersionButton() {
    this.showAddRulesVersionButton = !this.showAddRulesVersionButton;
    this.showAddRulesVersionFields = !this.showAddRulesVersionFields;

    if( this.showAddRulesVersionFields ) {
      this.showAddRulesAreaButton = false;
      this.showAddRulesAreaFields = false;
    }

    if( !this.showAddRulesVersionFields ) {
      this.showAddRulesAreaButton = true;
    }
  }
  getRulesAreaVersions() {
    console.log('getRulesAreaVersions');
    // @ts-ignore
    if( this.createFormRulesArea.get('selectRulesArea').value !== "-1" ) {

      // @ts-ignore
      console.log(this.createFormRulesArea.get('selectRulesArea').value);
      this.showAddRulesVersionButton = true;
    } else {
      this.showAddRulesVersionButton = false;
    }
  }

  onSubmitRulesAreaVersion() {
    this.submittedRulesVersion = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createFormRulesVersion.invalid) {
      return;
    }

    this.loading = true;
    // @ts-ignore
    let rulesAreaId: number = +this.createFormRulesArea.get('selectRulesArea').value;
    // @ts-ignore
    let rulesVersion: RulesVersion = new RulesVersion(-1, rulesAreaId, this.rav_name().value, "", "UTKAST");

    this.rulesAreasService.createRulesVersion(rulesVersion)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('The Rules area version has been successfully created', true);
          this.loading = false;
          this.showAddRulesAreaButton = true;
          this.showAddRulesVersionButton = true;
          this.showAddRulesVersionFields = false;
          this.createFormRulesVersion.reset();
          Object.keys(this.createFormRulesVersion.controls).forEach(key => {
            // @ts-ignore
            this.createFormRulesVersion.get(key).setErrors(null) ;
          })
          this.rulesAreas = [];
          this.rulesAreasService.getAll().subscribe(x =>
            {
              this.rulesAreas = x;
              //console.log('this.rulesAreas ' + this.rulesAreas.length + " " + JSON.stringify(this.rulesAreas));
              for( let i = 0; i < this.rulesAreas.length; ++i) {
                let area_id = this.rulesAreas[i].stringId;
                let name = this.rulesAreas[i].name;

                if (this.rulesAreas[i].rulesVersionDTOS !== null) {
                  console.log(JSON.stringify(this.rulesAreas[i].rulesVersionDTOS));
                  for (let j = 0; j < this.rulesAreas[i].rulesVersionDTOS.length; ++j) {
                    let version_name = this.rulesAreas[i].rulesVersionDTOS[j].name;
                    let published = this.rulesAreas[i].rulesVersionDTOS[j].published;
                    let status = this.rulesAreas[i].rulesVersionDTOS[j].status;
                    let rules_area_id = this.rulesAreas[i].id;
                    let rules_version_id = this.rulesAreas[i].rulesVersionDTOS[j].id;
                    let table1 = new Table1(area_id, name, version_name, published, status, rules_version_id, rules_area_id);
                    this.rulesVersionsTable.push(table1);
                  }
                }
              }
              this.dataSource = this.rulesVersionsTable;

              // @ts-ignore
              this.createFormRulesArea.get('selectRulesArea').setValue("-1");

            }
          )

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  clickedRows(row: any) {
    console.log(JSON.stringify(row));
    this.router.navigate(['/rulesversion', row.rules_version_id, row.rules_area_id]);
  }
}
//?rvid=' + row.rules_version_id + "&raid=" + row.rules_area_id
