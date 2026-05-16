export class Image {
  constructor(
    public id: string,
    public entityType: string,
    public entityId: string,
    public filename: string,
    public symlink: string,
  ) {}
}
