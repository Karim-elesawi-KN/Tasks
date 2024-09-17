import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({ providedIn: 'root' })
export class GregorianDateAdapter extends NativeDateAdapter {}
