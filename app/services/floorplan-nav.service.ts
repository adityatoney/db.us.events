import { Injectable } from '@angular/core';

@Injectable()
export class FloorPlanNavService {
  public sharedData:boolean;

  constructor(){
    this.sharedData = false;
  }

  setData (data) {
    this.sharedData = data;
  }
  getData () {
    return this.sharedData;
  }
}