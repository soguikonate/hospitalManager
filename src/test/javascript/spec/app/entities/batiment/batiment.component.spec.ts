/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalmanagerTestModule } from '../../../test.module';
import { BatimentComponent } from 'app/entities/batiment/batiment.component';
import { BatimentService } from 'app/entities/batiment/batiment.service';
import { Batiment } from 'app/shared/model/batiment.model';

describe('Component Tests', () => {
    describe('Batiment Management Component', () => {
        let comp: BatimentComponent;
        let fixture: ComponentFixture<BatimentComponent>;
        let service: BatimentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HospitalmanagerTestModule],
                declarations: [BatimentComponent],
                providers: []
            })
                .overrideTemplate(BatimentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BatimentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatimentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Batiment(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.batiments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
