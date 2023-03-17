import { Component, ElementRef, ViewChild } from '@angular/core';
// import { DataServices } from 'src/services/data.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiURL = 'http://127.0.0.1:8000/api';
  title = 'blog-fronted';
  @ViewChild('title', { static: true })
  titleElement!: ElementRef;
  @ViewChild('description', { static: true })
  descriptionElement!: ElementRef;
  loading: boolean = false;

  constructor() {}

  async createPost() {
    this.loading = true
    try {
      const response = await fetch(this.apiURL + '/post/create', {
        mode: 'cors',
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.titleElement.nativeElement.value,
          description: this.descriptionElement.nativeElement.value
        })
      })
      const resp = await response.json()
      console.log(resp)
      this.loading = false 
    } catch (error) {
      this.loading = false 
      
    }
  }
  

}
