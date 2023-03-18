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
  loading: boolean;
  posts: Array<any>;
  titleForm: string;
  descriptionForm: string;

  constructor() {
    this.loading = false
    this.posts = []
    this.titleForm = ''
    this.descriptionForm = ''
  }

  ngOnInit() {
    this.getPosts()
  }

  activeLoading(active: boolean){
    this.loading = active
  }

  async getPosts() {
    try {
      this.loading = true
      this.posts = []
      const response = await fetch(this.apiURL + '/post/all')
      const { status, data } = await response.json()
      if (status === 200) this.posts.push(...data)
      this.loading = false
    } catch (error) {
      this.loading = false
    }
  }

  async createPost() {
    try {
      if(this.titleForm.length === 0 || this.descriptionForm.length === 0){
        alert('Los campos Titulo y Descripción son obligatorios.')
        return
      }
      this.loading = true
      const formdata = new FormData();
      formdata.append("title", this.titleForm);
      formdata.append("description", this.descriptionForm);
      formdata.append("user_id", "1");

      const requestOptions: any = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      const response = await fetch(this.apiURL + "/post/create", requestOptions)
      const { status, data } = await response.json()
      if(status === 201) {
        this.titleForm = ''
        this.descriptionForm = ''
        this.posts.push(data)
      }
      this.loading = false
    } catch (error) {
      this.loading = false

    }
  }


}
