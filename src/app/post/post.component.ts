import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  private apiURL = 'http://127.0.0.1:8000/api';
  descriptionForm: string;

  @Input() 
  title: string | undefined;
  @Input()
  description: string | undefined;
  @Input()
  post_id: string;
  @Input()
  comments: Array<any>;

  @Output() updateData : EventEmitter<any> = new EventEmitter();
  @Output() loading : EventEmitter<boolean> = new EventEmitter();

  constructor(){
    this.descriptionForm = ''
    this.post_id = ''
    this.comments = []
  }

  async deleteComment(id: number) {
    try {
      const formdata = new FormData();
      formdata.append("id", id as unknown as string);

      const requestOptions: any = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      this.loading.emit(true)
      const response = await fetch(this.apiURL + "/comment/delete", requestOptions)
      const { status, msg } = await response.json()
      if(status === 200) {
        this.loading.emit(false)
        this.updateData.emit(null)
      }
    } catch (error) {
      this.loading.emit(false)
      alert('ha ocurrido un error interno')
    }

  }

  async deletePost() {
    try {
      const formdata = new FormData();
      formdata.append("id", this.post_id as unknown as string);

      const requestOptions: any = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      this.loading.emit(true)
      const response = await fetch(this.apiURL + "/post/delete", requestOptions)
      const { status, msg } = await response.json()
      if(status === 200) {
        this.loading.emit(false)
        this.updateData.emit(null)
      }
    } catch (error) {
      this.loading.emit(false)
      alert('ha ocurrido un error interno')
    }

  }

  async addComment() {
    try {
      if(this.descriptionForm.length === 0){
        alert('El campo comentario debe estar diligenciado')
        return
      }
      const formdata = new FormData();
      formdata.append("description", this.descriptionForm);
      formdata.append("post_id", this.post_id);
      formdata.append("user_id", "1");

      const requestOptions: any = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      this.loading.emit(true)
      const response = await fetch(this.apiURL + "/comment/create", requestOptions)
      const { status, data } = await response.json()
      if(status === 201) {
        this.descriptionForm = ''
        this.loading.emit(false)
        this.updateData.emit(null)
      }
    } catch (error) {

    }

  }
}
