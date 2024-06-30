import { Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  //postForm: FormGroup;
  public postToggle: boolean;
  constructor(private router: Router, private fb: FormBuilder)
  {
    this.postToggle = false;
  }

  togglePost()
  {
    this.postToggle = !this.postToggle;
  }
}
