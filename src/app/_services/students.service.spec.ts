/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule,
         HttpTestingController} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { StudentsService } from './students.service';
import { Students } from '../_models/students';

describe('Service: Students', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [StudentsService, HttpTestingController]
    });
    service = TestBed.get(StudentsService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve students profiles from the API', () => {
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

    let students: Students[] = [];

    service.getStudentsProfile().subscribe(data => {
      students = data.students;

      expect(data.students).not.toBeNull();
      expect(students.length).toBeGreaterThan(0);
    });
  });

});
