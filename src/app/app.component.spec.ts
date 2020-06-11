import {
  TestBed,
  async,
  ComponentFixture,
 } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StudentsService } from './_services/students.service';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Students } from './_models/students';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: StudentsService;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [StudentsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StudentsService);
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Student Profiles'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Students Profiles');
  });

  it('should have textbox to filter records by name', () => {
    const inEl = fixture.debugElement.query(By.css('#name-input'));
    expect(inEl.nativeElement).toBeTruthy();
  });

  it('should have textbox to filter records by tags', () => {
    const inEl = fixture.debugElement.query(By.css('#tag-input'));
    expect(inEl.nativeElement).toBeTruthy();
  });

  it('should load students profiles data from the server', () => {
    const stdObj: Students = {
      city: 'city',
      company: 'company',
      email: 'email@123.com',
      firstName: 'firstname',
      grades: [78, 80, 65, 78, 78, 56, 56, 98],
      id: 1,
      lastName: 'lastname',
      pic: 'picurl',
      skill: 'skill',
      avgGrades: 0,
      tags: [],
    };

    const expected = {
      students: [stdObj],
    };

    spyOn(service, 'getStudentsProfile').and.callFake(() => {
      return of(expected);
    });

    component.ngOnInit();
    expect(component.students.length).toBeGreaterThan(0);
    expect(component.students).toBe(expected.students);
  });

  it('should call method "onSearchByNamekeyup"', () => {
    spyOn(component, 'onSearchByNamekeyup');
    component.onSearchByNamekeyup('ro');
    expect(component.onSearchByNamekeyup).toHaveBeenCalled();
  });

  it('should call method "onSearchByTagkeyup"', () => {
    spyOn(component, 'onSearchByTagkeyup');
    component.onSearchByTagkeyup('tag 1');
    expect(component.onSearchByTagkeyup).toHaveBeenCalled();
  });


});
