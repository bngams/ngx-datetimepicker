import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { IsMobileService } from '../services/isMobile.service';
import { DateService, dayOfTheMonth } from '../services/date.service';

@Component({
	selector: 'ngx-datetime-picker',
	templateUrl: './dateTimePicker.component.html',
	encapsulation: ViewEncapsulation.None,
})

export class DateTimePickerComponent implements OnInit {
	@Input() selectedDateTime: Date;
	@Input() placeholder: string;
	@Input() format: string = 'YYYY-MM-DD HH:mm';

	@Output() selectedDateTimeChange = new EventEmitter<Date>();

	@HostListener('document:click', ['$event'])
	offClick(event) {
		if (!this.eRef.nativeElement.contains(event.target)) {
			this.pickerVisible = false;
		}
	}

	pickerVisible: boolean = false;
	isMobile: boolean;
	invalid: boolean;
	get formattedDate() {
		return this.dateService.toMoment(this.selectedDateTime, this.format);
	}
	get mobileFormattedDate() {
		return this.dateService.toMoment(this.selectedDateTime, this.format);
	}

	constructor(private isMobileService: IsMobileService, public dateService: DateService, private eRef: ElementRef) {
		this.isMobile = isMobileService.isMobile;
		this.placeholder = this.placeholder || '';

	}

	setDateTime(dateTime: string) {
		const isValid = !!Date.parse(dateTime);
		if (isValid) {
			this.selectedDateTime = new Date(dateTime);
			this.selectedDateTimeChange.emit(this.selectedDateTime);
			this.invalid = false;
		} else {
			this.invalid = true;
		}
	}

	ngOnInit() {
		if (typeof this.selectedDateTime == 'string') {
			this.selectedDateTime = new Date(this.selectedDateTime);
		}
	}

	newDatePicked(date: Date): void {
		this.selectedDateTimeChange.emit(date);
		this.selectedDateTime = date;
	}

	closePicker(close: boolean): void {
		this.pickerVisible = close;
	}
}
