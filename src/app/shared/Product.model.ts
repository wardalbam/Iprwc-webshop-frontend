export class Product{
  public get imagePath(): string {
    return this.ImagePath;
  }
  public set imagePath(value: string) {
    this.ImagePath = value;
  }
  constructor(public id:string, public name: string, public price: number, public ImagePath: string, public description: string, public productStatus : string) {}
}
