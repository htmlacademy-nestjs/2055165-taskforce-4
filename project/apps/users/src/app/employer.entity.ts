import { UserRole, City, Employer } from '@project/shared/app-types';


export class EmployerEntity implements Employer {
  id: string;
  name: string;
  email: string;
  aboutInfo: string;
  avatar: string;
  hashPassword: string;
  birthDate: Date;
  city: City;
  role: UserRole;
  registrationDate: Date;
  publishedTasksCount: number;
  newTasksCount: number;

  constructor (employer: Employer) {
    this.fillEntity(employer);
  }

  public fillEntity(employer: Employer) {
    this.id = employer.id;
    this.name = employer.name;
    this.email = employer.email;
    this.aboutInfo = employer.aboutInfo;
    this.avatar = employer.avatar;
    this.hashPassword = employer.hashPassword;
    this.birthDate = employer.birthDate;
    this.city = employer.city;
    this.role = employer.role;
    this.registrationDate = employer.registrationDate;
    this.publishedTasksCount = employer.publishedTasksCount;
    this.newTasksCount = employer.newTasksCount;
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      aboutInfo: this.aboutInfo,
      avatar: this.avatar,
      hashPassword: this.hashPassword,
      birthDate: this.birthDate,
      city: this.city,
      role: this.role,
      registrationDate: this.registrationDate,
      publishedTasksCount: this.publishedTasksCount,
      newTasksCount: this.newTasksCount
    };
  }
}
