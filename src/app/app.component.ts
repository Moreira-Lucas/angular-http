import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Car } from './models/car';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
car = {} as Car;
cars: Car[];

constructor(private carService: CarService){}



ngOnInit(){
  this.getCars();
}

//definir se um carro será criado ou atualizado.
saveCar(form: NgForm){
  if(this.car.id !== undefined){
    this.carService.updateCar(this.car).subscribe(()=> this.cleanForm(form));
  }else{
    this.carService.saveCar(this.car).subscribe(()=> this.cleanForm(form));
  }
}

//Chama o serviço para obter todos os carros
getCars(){
  this.carService.getCars().subscribe((cars:Car[])=> {this.cars = cars});
}

//deletar um carro
deleteCar(car: Car){
this.carService.deleteCar(car).subscribe(()=>{
  this.getCars();
})}



// copia o carro para ser editado
editCar(car: Car) {
  this.car = {...car};

}

  //limpa o formulário
cleanForm(form: NgForm) {
  this.getCars();
  form.resetForm();
  this.car = {} as Car;  

}
}
