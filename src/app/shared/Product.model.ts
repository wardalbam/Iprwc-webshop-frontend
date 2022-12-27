export class Product{
  public get imagePath(): string {
    return this.ImagePath;
  }
  public set imagePath(value: string) {
    this.ImagePath = value;
  }
  constructor(public id:string, public name: string, public price: number, private ImagePath: string, public description: string, private productStatus : string) {}
}
