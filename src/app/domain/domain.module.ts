import { NgModule } from '@angular/core';
import { TestRepository } from './repositories/test-repository.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        TestRepository
    ]
})
export class DomainModule { }
