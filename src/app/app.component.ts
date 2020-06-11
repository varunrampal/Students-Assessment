import { Component, OnInit, ɵPlayState } from '@angular/core';
import { StudentsService } from './_services/students.service';
import { Students } from './_models/students';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Students Profiles';
  students: Students[] = [];
  studentRecords: Students[] = [];
  grades: number[] = [];
  studentArray: any[];

  visibleIndex = -1;

  constructor(private studentService: StudentsService) {}

  ngOnInit() {

    // populate students profile list
    this.getStudents();
  

  }

 // Get students profile data from API
  getStudents() {

    const average = (arr: any[]) =>
      arr.reduce((p: any, c: any) => p + c, 0) / arr.length;

     // Subscribe to API function and push data to students array
    this.studentService.getStudentsProfile().subscribe(
      (data) => {

        this.students = data.students;

        this.students.map(res => {

            const grades = res.grades.map((num) => parseFloat(num.toString()));
            res.avgGrades = average(grades);
            res.tags = [];
          }, (error: any) => { console.log(error); });
        this.studentRecords = this.students;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Show/hide grades div
  showGrades(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }

  // Serach profiles by name
  onSearchByNamekeyup(val: string) {

    if (val.trim() === '') {
      this.students = [];
      this.getStudents();
    } else {
      val = val.toLocaleLowerCase();

      const students = this.students.filter(
        (obj) =>
          obj.firstName.toLocaleLowerCase().startsWith(val) ||
          obj.lastName.toLocaleLowerCase().startsWith(val)
      );
      this.students = students;

    }
  }

  // Search profiles by tag
  onSearchByTagkeyup(val: string) {

    if (val.trim() === '') {
      this.students = this.studentRecords;
    } else {
      val = val.toLocaleLowerCase();
      const filteredStudents = this.studentRecords.filter(
        (obj) => obj.tags.length > 0 && obj.tags.indexOf(val) !== -1
      );

      if (filteredStudents.length > 0) {
        console.log(filteredStudents);
        this.students = filteredStudents;
      }
    }
  }

  // Add tags to profiles
  onAddTag(event, index, studentId) {
    const student = this.students.filter((obj) => obj.id === studentId);
    this.students.map((data) => {
      if (data.id === studentId) {
        const tagExists = data.tags.includes(event.target.value);
        if (!tagExists) {
           data.tags.push(event.target.value);
         }
      }
    });
    this.studentRecords = [];

    this.studentRecords = this.students;

  }
}
