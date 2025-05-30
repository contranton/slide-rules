///////////////////////////////////////////////////////////////////////////////////
//                     Copyright (C) 2017 Dr Robert P. Wolf                      //
//                                                                               //
// Permission is hereby granted, free of charge, to any person obtaining a copy  //
// of this software and associated documentation files (the "Software"), to deal //
// in the Software without restriction, including without limitation the rights  //
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell     //
// copies of the Software, and to permit persons to whom the Software is         //
// furnished to do so, subject to the following conditions:                      //
//                                                                               //
// The above copyright notice and this permission notice shall be included in    //
// all copies or substantial portions of the Software.                           //
//                                                                               //
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR    //
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,      //
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE   //
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER        //
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, //
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN     //
// THE SOFTWARE.                                                                 //
///////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// A, B, AI, BI
// C, D, CI, DI
// CF, DF, CIF, DIF
// K, J
// R1, R2, W1, W2
// Q1, Q2, Q3, O1, O2, O3
// L, M, Ln, Mn, LR12, LW12, L01, M01
// Sdec(_down), S(_down), SCdec(_down), CSdec(_down), Sgrad(_down)
// STdec(_down), ST(_down), STCTdec(_down), CTSTdec(_down), STCTgrad(_down), CTSTgrad(_down)
// Tdec(_down), T1dec(_down), TCTdec(_down), CTTdec(_down), TCT1dec(_down), CTT1dec(_down)
// T(_down), T1(_down)
// Tgrad(_down), T1grad(_down)
// P(_down), PH(_down), PH2(_down), PT(_down)
// ISTd(_down)
// LL3(_down), LL2(_down), LL1(_down), LL0(_down), CLL0, DLL0
// LL03(_down), LL02(_down), LL01(_down), LL00(_down)
// Metric(_down) => step, scale, shift
// StudyMate(_down) => step, scale, shift
// SINH1dec(_down), SINH2dec(_down), SINH1grad(_down), SINH2grad(_down), SINH1rad(_down), SINH2rad(_down);
// COSHdec(_down), COSHgrad(_down), COSHrad(_down)
// TANHdec(_down), TANHgrad(_down), TANHrad(_down)
// CONST(_down)
//////////////////////////////////////////////////////////////////////////////

var toDeg = function (value) {
	var deg = value | 0;
	var frac = Math.abs(value - deg);
	var min = (frac * 60) | 0;
	var sec = Math.round(frac * 3600 - min * 60);
	if (sec == 60) { sec = 0; min += 1; }
	if (min == 60) { min = 0; deg += 1; }
	sec = sec | 0;
	if (min < 10) min = "0" + min;
	if (sec < 10) sec = "0" + sec;
	return deg + ":" + min + ":" + sec;
};
var scale_A = inherit(spacer);
scale_A.prototype.draw_c = false;
scale_A.prototype.value = function (location) { return Math.pow(10, location + location); };
scale_A.prototype.location = function (value) { return Math.log10(value) * 0.5; };
scale_A.prototype.draw = function (ctx, length) {
	ctx.translate(0, this.height);
	draw_log_log(ctx, length, this.height, this, this.left_extension, this.right_extension);
};
var scale_B = inherit(scale_A);
scale_B.prototype.draw = function (ctx, length) { draw_log_log(ctx, length, - this.height, this, this.left_extension, this.right_extension); };
var scale_AI = inherit(spacer);
scale_AI.prototype.draw_c = false;
scale_AI.prototype.value = function (location) { return Math.pow(10, 2 - location - location); };
scale_AI.prototype.location = function (value) { return 1 - Math.log10(value) * 0.5; };
scale_AI.prototype.draw = function (ctx, length) {
	ctx.translate(length, this.height);
	draw_log_log(ctx, - length, this.height, this, this.right_extension, this.left_extension);
};
var scale_BI = inherit(scale_AI);
scale_BI.prototype.draw = function (ctx, length) {
	ctx.translate(length, 0); draw_log_log(ctx, - length, - this.height, this, this.right_extension, this.left_extension);
};
var scale_C = inherit(spacer);
scale_C.prototype.value = function (location) { return Math.pow(10, location); };
scale_C.prototype.location = function (value) { return Math.log10(value); };
scale_C.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_log(ctx, length, this.height, this, this.left_extension, this.right_extension); };
var scale_D = inherit(scale_C);
scale_D.prototype.draw = function (ctx, length) { draw_log(ctx, length, - this.height, this, this.left_extension, this.right_extension); };
var scale_CI = inherit(spacer);
scale_CI.prototype.value = function (location) { return Math.pow(10, 1 - location); };
scale_CI.prototype.location = function (value) { return 1 - Math.log10(value); };
scale_CI.prototype.draw = function (ctx, length) { ctx.translate(length, this.height); draw_log(ctx, - length, this.height, this, this.right_extension, this.left_extension); };
var scale_DI = inherit(scale_CI);
scale_DI.prototype.draw = function (ctx, length) { ctx.translate(length, 0); draw_log(ctx, - length, - this.height, this, this.right_extension, this.left_extension); };
var scale_CF = inherit(spacer);
scale_CF.prototype.value = function (location) { return Math.pow(10, location) * Math.PI * 0.1; };
scale_CF.prototype.location = function (value) { return Math.log10(10 * value / Math.PI); };
scale_CF.prototype.draw = function (ctx, length) {
	var shift = this.location(1);
	ctx.translate(length * shift, this.height);
	draw_log_1R(ctx, length, this.height, 1 - shift + this.right_extension, this, 0 - shift - this.left_extension);
	mark(ctx, this.indices[0], 0, this.height * 0.5);
	ctx.translate(- length, 0);
	draw_log_1L(ctx, length, this.height, 1 - shift - this.left_extension, this);
};
var scale_DF = inherit(scale_CF);
scale_DF.prototype.draw = function (ctx, length) {
	var shift = this.location(1);
	ctx.translate(length * shift, 0);
	draw_log_1R(ctx, length, - this.height, 1 - shift + this.right_extension, this, 0 - shift - this.left_extension);
	mark(ctx, this.indices[0], 0, - this.height * 0.5);
	ctx.translate(- length, 0);
	draw_log_1L(ctx, length, - this.height, 1 - shift - this.left_extension, this);
};
var scale_CIF = inherit(spacer);
scale_CIF.prototype.value = function (location) { return 10 / (Math.pow(10, location) * Math.PI); };
scale_CIF.prototype.location = function (value) { return Math.log10(1 / (Math.PI * value * 0.1)); };
scale_CIF.prototype.draw = function (ctx, length) {
	var shift = Math.log10(10 / Math.PI);
	ctx.translate(length * shift, this.height);
	draw_log_1R(ctx, - length, this.height, shift + this.left_extension, this);
	mark(ctx, this.indices[0], 0, this.height * 0.5);
	ctx.translate(length, 0);
	draw_log_1L(ctx, - length, this.height, shift - this.right_extension, this);
};
var scale_DIF = inherit(scale_CIF);
scale_DIF.prototype.draw = function (ctx, length) {
	var shift = Math.log10(10 / Math.PI);
	ctx.translate(length * shift, 0);
	draw_log_1R(ctx, - length, - this.height, shift + this.left_extension, this);
	mark(ctx, this.indices[0], 0, - this.height * 0.5);
	ctx.translate(length, 0);
	draw_log_1L(ctx, - length, - this.height, shift - this.right_extension, this);
};
var scale_K = inherit(spacer);
scale_K.prototype.draw_c = false;
scale_K.prototype.value = function (location) { return Math.pow(10, location * 3); };
scale_K.prototype.location = function (value) { return Math.log10(value) / 3; };
scale_K.prototype.draw = function (ctx, length) {
	ctx.translate(0, this.height);
	draw_log_log_log(ctx, length, this.height, this, this.left_extension, this.right_extension);
};
var scale_KI = inherit(spacer);
scale_KI.prototype.draw_c = false;
scale_KI.prototype.value = function (location) { return Math.pow(10, 3 - location - location - location); };
scale_KI.prototype.location = function (value) { return 1 - Math.log10(value) / 3; };
scale_KI.prototype.draw = function (ctx, length) {
	ctx.translate(length, this.height);
	draw_log_log_log(ctx, - length, this.height, this, this.right_extension, this.left_extension);
};
var scale_J = inherit(scale_K);
scale_J.prototype.draw = function (ctx, length) { draw_log_log_log(ctx, length, - this.height, this, this.left_extension, this.right_extension); };
var scale_JI = inherit(scale_KI);
scale_JI.prototype.draw = function (ctx, length) {
	ctx.translate(length, 0); draw_log_log_log(ctx, - length, - this.height, this, this.right_extension, this.left_extension);
};
var scale_R1 = inherit(spacer);
scale_R1.prototype.value = function (location) { return Math.pow(10, location * 0.5); };
scale_R1.prototype.location = function (value, length) { return Math.log10(value) * 2; };
scale_R1.prototype.draw = function (ctx, length) {
	ctx.translate(0, this.height);
	mark(ctx, this.indices[0], 0, this.height * 0.5);
	draw_log_1R(ctx, length * 2, this.height, 0.5 + this.right_extension * 0.5, this);
	ctx.translate(-2 * length, 0);
	draw_log_1L(ctx, length * 2, this.height, 1 - this.left_extension * 0.5, this);
};
var scale_R2 = inherit(spacer);
scale_R2.prototype.value = function (location) { return Math.pow(10, 0.5 + location * 0.5); };
scale_R2.prototype.location = function (value, length) { return Math.log10(value) * 2 - 1; };
scale_R2.prototype.draw = function (ctx, length) {
	ctx.translate(- length, this.height);
	draw_log_1L(ctx, length * 2, this.height, 0.5 - this.left_extension * 0.5, this);
	ctx.translate(2 * length, 0);
	mark(ctx, this.indices[1], 0, this.height * 0.5);
	draw_log_1R(ctx, length * 2, this.height, this.right_extension * 0.5, this);
};
var scale_W1 = inherit(scale_R1);
scale_W1.prototype.draw = function (ctx, length) {
	mark(ctx, this.indices[0], 0, - this.height * 0.5);
	draw_log_1R(ctx, length * 2, - this.height, 0.5 + this.right_extension * 0.5, this);
	ctx.translate(-2 * length, 0);
	draw_log_1L(ctx, length * 2, - this.height, 1 - this.left_extension * 0.5, this);
};
var scale_W2 = inherit(scale_R2);
scale_W2.prototype.draw = function (ctx, length) {
	ctx.translate(- length, 0);
	draw_log_1L(ctx, length * 2, - this.height, 0.5 - this.left_extension * 0.5, this);
	ctx.translate(2 * length, 0);
	mark(ctx, this.indices[1], 0, - this.height * 0.5);
	draw_log_1R(ctx, length * 2, - this.height, this.right_extension * 0.5, this);
};
var scale_Q1 = inherit(spacer);
scale_Q1.prototype.value = function (location) { return Math.pow(10, location / 3); };
scale_Q1.prototype.location = function (value, length) { return Math.log10(value) * 3; };
scale_Q1.prototype.draw = function (ctx, length) {
	ctx.translate(0, this.height);
	mark(ctx, this.indices[0], 0, this.height * 0.5);
	draw_log_1R(ctx, length * 3, this.height, 1 / 3 + this.right_extension / 3, this);
	ctx.translate(-3 * length, 0);
	draw_log_1L(ctx, length * 3, this.height, 1 - this.left_extension / 3, this);
};
var scale_Q2 = inherit(spacer);
scale_Q2.prototype.value = function (location) { return Math.pow(10, 1 / 3 + location / 3); };
scale_Q2.prototype.location = function (value, length) { return Math.log10(value) * 3 - 1; };
scale_Q2.prototype.draw = function (ctx, length) {
	var region = new Path2D();
	var left = length * - this.left_extension;
	var right = length * (1 + this.right_extension);
	region.moveTo(left, 0); region.lineTo(right, 0); region.lineTo(right, 24); region.lineTo(left, 24); region.closePath();
	ctx.save(); ctx.clip(region);
	ctx.translate(- length, this.height);
	draw_log_1L(ctx, length * 3, this.height, 1 / 3 - this.left_extension / 3, this);
	ctx.restore();
};
var scale_Q3 = inherit(spacer);
scale_Q3.prototype.value = function (location) { return Math.pow(10, 2 / 3 + location / 3); };
scale_Q3.prototype.location = function (value, length) { return Math.log10(value) * 3 - 2; };
scale_Q3.prototype.draw = function (ctx, length) {
	ctx.translate(-2 * length, this.height);
	draw_log_1L(ctx, length * 3, this.height, 2 / 3 - this.left_extension / 3, this);
	ctx.translate(3 * length, 0);
	mark(ctx, this.indices[1], 0, this.height * 0.5);
	draw_log_1R(ctx, length * 3, this.height, this.right_extension / 3, this);
};
var scale_O1 = inherit(scale_Q1);
scale_O1.prototype.draw = function (ctx, length) {
	mark(ctx, this.indices[0], 0, - this.height * 0.5);
	draw_log_1R(ctx, length * 3, - this.height, 1 / 3 + this.right_extension / 3, this);
	ctx.translate(-3 * length, 0);
	draw_log_1L(ctx, length * 3, - this.height, 1 - this.left_extension / 3, this);
};
var scale_O2 = inherit(scale_Q2);
scale_O2.prototype.draw = function (ctx, length) {
	var region = new Path2D();
	var left = length * - this.left_extension;
	var right = length * (1 + this.right_extension);
	region.moveTo(left, 0); region.lineTo(right, 0); region.lineTo(right, 24); region.lineTo(left, 24); region.closePath();
	ctx.save(); ctx.clip(region);
	ctx.translate(- length, 0);
	draw_log_1L(ctx, length * 3, - this.height, 1 / 3 - this.left_extension / 3, this);
	ctx.restore();
};
var scale_O3 = inherit(scale_Q3);
scale_O3.prototype.draw = function (ctx, length) {
	ctx.translate(-2 * length, 0);
	draw_log_1L(ctx, length * 3, - this.height, 2 / 3 - this.left_extension / 3, this);
	ctx.translate(3 * length, 0);
	mark(ctx, this.indices[1], 0, - this.height * 0.5);
	draw_log_1R(ctx, length * 3, - this.height, this.right_extension / 3, this);
};
var scale_Metric = function (height, options) {
	spacer.call(this, height, options);
	var self = this;
	this.value = function (location) { return location * self.scale - self.shift; };
	this.location = function (value) { return value / self.scale + self.shift / self.scale; };
};
inherit(scale_Metric, spacer);
scale_Metric.prototype.metric_25 = false;
scale_Metric.prototype.step = 1;
scale_Metric.prototype.scale = 10;
scale_Metric.prototype.shift = 0;
scale_Metric.prototype.draw = function (ctx, length) {
	ctx.translate(0, this.height);
	if (this.metric_25) draw_metric_25(ctx, length, this.height, this);
	else draw_metric(ctx, length, this.height, this);
};

var scale_Metric_down = inherit(scale_Metric);
scale_Metric_down.prototype.draw = function (ctx, length) {
	if (this.metric_25) draw_metric_25(ctx, length, - this.height, this);
	else draw_metric(ctx, length, - this.height, this);
};
var scale_StudyMate = function (height, options) {
	spacer.call(this, height, options);
	var self = this;
	this.value = function (location) { return location * self.scale - self.shift; };
	this.location = function (value) { return value / self.scale + self.shift / self.scale; };
};
inherit(scale_StudyMate, spacer);
scale_StudyMate.prototype.step = 1;
scale_StudyMate.prototype.scale = 10;
scale_StudyMate.prototype.shift = 0;
scale_StudyMate.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_studymate(ctx, length, this.height, this); };
var scale_StudyMate_down = function (height, options) { scale_StudyMate.call(this, height, options); }; inherit(scale_StudyMate_down, scale_StudyMate);
scale_StudyMate_down.prototype.draw = function (ctx, length) { draw_studymate(ctx, length, - this.height, this); };
var scale_L = inherit(spacer);
scale_L.prototype.value = function (location) { return location * 10; };
scale_L.prototype.location = function (value) { return value * 0.1; };
scale_L.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_lin(ctx, length, this.height, this); };
var scale_M = inherit(scale_L);
scale_M.prototype.draw = function (ctx, length) { draw_lin(ctx, length, - this.height, this); };
var draw_ln = function (ctx, length, height, scale) {
	var h5 = height * 0.5; var h4 = height * 0.4; var h3 = height * 0.3; var h2 = height * 0.2;
	var limit = 1 + scale.right_extension;
	draw_MRS(ctx, scale.location, length, 0, 4, 0.1, limit, h5);
	draw_XR(ctx, scale.location, length, 0, 4, limit, h2, 0.05, 0.01, 0.05);
	draw_XR(ctx, scale.location, length, 0, 4, limit, h3, 0.1, 0.05, 0.1);
};
var scale_Ln = inherit(spacer);
scale_Ln.prototype.value = function (location) { return location * Math.log(10); };
scale_Ln.prototype.location = function (value) { return value === 0 ? 0 : value / Math.log(10); };
scale_Ln.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_ln(ctx, length, this.height, this); };
var scale_Mn = inherit(scale_Ln);
scale_Mn.prototype.draw = function (ctx, length) { draw_ln(ctx, length, - this.height, this); };
var scale_LR12 = inherit(spacer);
scale_LR12.prototype.value = function (location) { return location * 5; };
scale_LR12.prototype.location = function (value) { return value * 0.2; };
scale_LR12.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_lin_12(ctx, length, this.height, this); };
var scale_LW12 = inherit(scale_LR12);
scale_LW12.prototype.draw = function (ctx, length) { draw_lin_12(ctx, length, - this.height, this); };
var scale_Sdec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.asin(Math.pow(10, location - 1)) * 180 / Math.PI; };
	s.location = function (value) { return 1 + Math.log10(Math.sin(value * Math.PI / 180)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_sine_dec(ctx, length, s.height, s); };
	return s;
};
var scale_L01 = inherit(spacer);
scale_L01.prototype.value = function (location) { return location; };
scale_L01.prototype.location = function (value) { return value; };
scale_L01.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_lin_01(ctx, length, this.height, this); };
var scale_M01 = inherit(scale_L01);
scale_M01.prototype.draw = function (ctx, length) { draw_lin_01(ctx, length, - this.height, this); };
var scale_Sdec_down = function (height, options) {
	var s = new scale_Sdec(height, options);
	s.draw = function (ctx, length) { draw_sine_dec(ctx, length, - s.height, s); };
	return s;
};
var scale_S = function (height, options) {
	var s = new scale_Sdec(height, options);
	s.display = function (location, precision) { return toDeg(this.value(location)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_sine_deg(ctx, length, s.height, s); };
	return s;
};
var scale_S_down = function (height, options) {
	var s = new scale_S(height, options);
	s.draw = function (ctx, length) { draw_sine_deg(ctx, length, - s.height, s); };
	return s;
};
var scale_Sgrad = function (height, options) {
	var s = new scale_Sdec(height, options);
	s.value = function (location) { return Math.asin(Math.pow(10, location - 1)) * 200 / Math.PI; };
	s.location = function (value) { return 1 + Math.log10(Math.sin(value * Math.PI / 200)); };
	return s;
};
var scale_Sgrad_down = function (height, options) {
	var s = new scale_Sgrad(height, options);
	s.draw = function (ctx, length) { draw_sine_dec(ctx, length, - s.height, s); };
	return s;
};
var scale_STdec = function (height, options) { spacer.call(this, height, options); }; inherit(scale_STdec, spacer);
scale_STdec.prototype.draw_c = false;
scale_STdec.prototype.draw_pi = false;
scale_STdec.prototype.draw_e = false;
scale_STdec.prototype.draw_halves = true;
scale_STdec.prototype.draw_st_corrections = true;
scale_STdec.prototype.value = function (location) { return Math.pow(10, location) * 1.8 / Math.PI; };
scale_STdec.prototype.location = function (value) { return Math.log10(value * Math.PI / 1.8); };
scale_STdec.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_small_sine_dec(ctx, length, this.height, this); };
var scale_STdec_down = function (height, options) { scale_STdec.call(this, height, options); }; inherit(scale_STdec_down, scale_STdec);
scale_STdec_down.prototype.draw = function (ctx, length) { draw_small_sine_dec(ctx, length, - this.height, this); };
var scale_ST = function (height, options) {
	var s = new scale_STdec(height, options);
	s.display = function (location, precision) { return toDeg(this.value(location)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_small_sine_deg(ctx, length, s.height, s); };
	return s;
};
var scale_STCTdec = inherit(scale_STdec);
scale_STCTdec.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_small_sine_tan_dec(ctx, length, this.height, this, 'cs', 90); };
var scale_STCTdec_down = inherit(scale_STCTdec);
scale_STCTdec_down.prototype.draw = function (ctx, length) { draw_small_sine_tan_dec(ctx, length, - this.height, this, 'cs', 90); };
var scale_CTSTdec = inherit(scale_STCTdec);
scale_CTSTdec.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_small_sine_tan_dec(ctx, length, this.height, this, 'sc', 90); };
var scale_CTSTdec_down = inherit(scale_STCTdec);
scale_CTSTdec_down.prototype.draw = function (ctx, length) { draw_small_sine_tan_dec(ctx, length, - this.height, this, 'sc', 90); };
var scale_STCTgrad = inherit(scale_STCTdec);
scale_STCTgrad.prototype.value = function (location) { return Math.pow(10, location) * 2 / Math.PI; };
scale_STCTgrad.prototype.location = function (value) { return Math.log10(value * Math.PI / 2); };
scale_STCTgrad.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_small_sine_tan_dec(ctx, length, this.height, this, 'cs', 100); };
var scale_STCTgrad_down = inherit(scale_STCTgrad);
scale_STCTgrad_down.prototype.draw = function (ctx, length) { draw_small_sine_tan_dec(ctx, length, - this.height, this, 'cs', 100); };
var scale_CTSTgrad = inherit(scale_STCTgrad);
scale_CTSTgrad.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_small_sine_tan_dec(ctx, length, this.height, this, 'sc', 100); };
var scale_CTSTgrad_down = inherit(scale_STCTgrad);
scale_CTSTgrad_down.prototype.draw = function (ctx, length) { draw_small_sine_tan_dec(ctx, length, - this.height, this, 'sc', 100); };
var scale_ST_down = function (height, options) {
	var s = new scale_ST(height, options);
	s.draw = function (ctx, length) { draw_small_sine_deg(ctx, length, - s.height, s); };
	return s;
};
var scale_Tdec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.atan(Math.pow(10, location - 1)) * 180 / Math.PI; };
	s.location = function (value) { return 1 + Math.log10(Math.tan(value * Math.PI / 180)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_tan_dec(ctx, length, s.height, s); };
	return s;
};
var scale_Tdec_down = function (height, options) {
	var s = new scale_Tdec(height, options);
	s.draw = function (ctx, length) { draw_tan_dec(ctx, length, - s.height, s); };
	return s;
};
var scale_T = function (height, options) {
	var s = new scale_Tdec(height, options);
	s.display = function (location, precision) { return toDeg(this.value(location)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_tan_deg(ctx, length, s.height, s); };
	return s;
};
var scale_T_down = function (height, options) {
	var s = new scale_T(height, options);
	s.draw = function (ctx, length) { draw_tan_deg(ctx, length, - s.height, s); };
	return s;
};
var scale_Tgrad = function (height, options) {
	var s = new scale_Tdec(height, options);
	s.value = function (location) { return Math.atan(Math.pow(10, location - 1)) * 200 / Math.PI; };
	s.location = function (value) { return 1 + Math.log10(Math.tan(value * Math.PI / 200)); };
	return s;
};
var scale_Tgrad_down = function (height, options) {
	var s = new scale_Tgrad(height, options);
	s.draw = function (ctx, length) { draw_tan_dec(ctx, length, - s.height, s); };
	return s;
};
var scale_T1grad = inherit(spacer);
scale_T1grad.prototype.value = function (location) { return Math.atan(Math.pow(10, location)) * 200 / Math.PI; };
scale_T1grad.prototype.location = function (value) { return Math.log10(Math.tan(value * Math.PI / 200)); };
scale_T1grad.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_tan_dec1(ctx, length, this.height, this); };
var scale_T1grad_down = inherit(scale_T1grad);
scale_T1grad_down.prototype.draw = function (ctx, length) { draw_tan_dec1(ctx, length, - this.height, this); };
var scale_TCTdec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.atan(Math.pow(10, location - 1)) * 180 / Math.PI; };
	s.location = function (value) { return 1 + Math.log10(Math.tan(value * Math.PI / 180)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_tan_cotan_dec(ctx, length, s.height, s); };
	return s;
};
var scale_TCTdec_down = function (height, options) {
	var s = new scale_TCTdec(height, options);
	s.draw = function (ctx, length) { draw_tan_cotan_dec(ctx, length, - s.height, s); };
	return s;
};
var scale_CTTdec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.atan(Math.pow(10, location - 1)) * 180 / Math.PI; };
	s.location = function (value) { return 1 + Math.log10(Math.tan(value * Math.PI / 180)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_cotan_tan_dec(ctx, length, s.height, s); };
	return s;
};
var scale_CTTdec_down = function (height, options) {
	var s = new scale_CTTdec(height, options);
	s.draw = function (ctx, length) { draw_cotan_tan_dec(ctx, length, - s.height, s); };
	return s;
};
var scale_T1dec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.atan(Math.pow(10, location)) * 180 / Math.PI; };
	s.location = function (value) { return Math.log10(Math.tan(value * Math.PI / 180)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_big_tan_dec(ctx, length, s.height, s); };
	return s;
};
var scale_T1dec_down = function (height, options) {
	var s = new scale_T1dec(height, options);
	s.draw = function (ctx, length) { draw_big_tan_dec(ctx, length, - s.height, s); };
	return s;
};
var scale_T1 = function (height, options) {
	var s = new scale_T1dec(height, options);
	s.display = function (location, precision) { return toDeg(this.value(location)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_big_tan_deg(ctx, length, s.height, s); };
	return s;
};
var scale_T1_down = function (height, options) {
	var s = new scale_T1(height, options);
	s.draw = function (ctx, length) { draw_big_tan_deg(ctx, length, - s.height, s); };
	return s;
};
var scale_TCT1dec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.atan(Math.pow(10, location)) * 180 / Math.PI; };
	s.location = function (value) { return Math.log10(Math.tan(value * Math.PI / 180)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_big_tan_cotan_dec(ctx, length, s.height, s); };
	return s;
};
var scale_TCT1dec_down = function (height, options) {
	var s = new scale_TCT1dec(height, options);
	s.draw = function (ctx, length) { draw_big_tan_cotan_dec(ctx, length, - s.height, s); };
	return s;
};
var scale_TCT2dec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.atan(Math.pow(10, location + 1)) * 180 / Math.PI; };
	s.location = function (value) { return Math.log10(Math.tan(value * Math.PI / 180)) - 1; };
	s.draw = function (ctx, length) {
		ctx.translate(0, s.height);
		var h5 = s.height * 0.5, h4 = s.height * 0.4, h3 = s.height * 0.3, h2 = s.height * 0.2;
		var ext = - s.left_extension;
		for (var ind = 80; ind <= 89; ind += 1) {
			var l = s.location(ind);
			if (l > ext) {
				l *= length;
				tick(ctx, l, h5);
				ctx.textAlign = 'right'; ctx.fillStyle = s.colour; mmark(ctx, ind, l - 1, h5);
				ctx.textAlign = 'left'; ctx.fillStyle = s.alt; mmark(ctx, 90 - ind, l + 1, h5);
			}
		}
		draw_XR(ctx, s.location, length, 85, 88, 1, h2, 0.1, 0.02, 0.1);
		draw_XR(ctx, s.location, length, 85, 88, 1, h3, 0.5, 0.1, 0.5);
		draw_XR(ctx, s.location, length, 85, 88, 1, h4, 1, 0.5, 1);
		draw_XL(ctx, s.location, length, 80, 85, ext, h2, 0.1, 0.05, 0.1);
		draw_XL(ctx, s.location, length, 80, 85, ext, h3, 0.5, 0.1, 0.5);
		draw_XL(ctx, s.location, length, 80, 85, ext, h4, 1, 0.5, 1);
		draw_XR(ctx, s.location, length, 88, 89, 1, h2, 0.05, 0.01, 0.05);
		draw_XR(ctx, s.location, length, 88, 89, 1, h3, 0.1, 0.05, 0.1);
		draw_XR(ctx, s.location, length, 88, 89, 1, h4, 0.5, 0.1, 0.5);
		tick(ctx, s.location(88.5) * length, h5);
		ext = 1 + s.right_extension;
		draw_XR(ctx, s.location, length, 89, 90, ext, h2, 0.01, 0.005, 0.01);
		draw_XR(ctx, s.location, length, 89, 90, ext, h3, 0.05, 0.01, 0.05);
		draw_XR(ctx, s.location, length, 89, 90, ext, h4, 0.1, 0.05, 0.1);
		draw_XR(ctx, s.location, length, 89, 90, ext, h5, 1, 0.1, 1);
		ctx.textAlign = 'left'; ctx.fillStyle = s.alt;
		for (var ind = 1; ind < 10; ind += 1) {
			var l = s.location(89 + ind / 10);
			if (l < ext) { l *= length; mmark(ctx, '.' + ind, l + 1, h5); }
		}
		var l = s.location(88.5) * length;
		mmark(ctx, '1.5', l + 1, h5);
		ctx.textAlign = 'right'; ctx.fillStyle = s.colour; mmark(ctx, '88.5', l - 1, h5);
	};
	return s;
};
var scale_TCT2dec_down = function (height, options) {
	var s = new scale_TCT2dec(height, options);
	s.draw = function (ctx, length) { };
	return s;
};
var scale_CTT1dec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.atan(Math.pow(10, location)) * 180 / Math.PI; };
	s.location = function (value) { return Math.log10(Math.tan(value * Math.PI / 180)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_big_cotan_tan_dec(ctx, length, s.height, s); };
	return s;
};
var scale_CTT1dec_down = function (height, options) {
	var s = new scale_CTT1dec(height, options);
	s.draw = function (ctx, length) { draw_big_cotan_tan_dec(ctx, length, - s.height, s); };
	return s;
};
var scale_SCdec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.asin(Math.pow(10, location - 1)) * 180 / Math.PI; };
	s.location = function (value) { return 1 + Math.log10(Math.sin(value * Math.PI / 180)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_sine_cosine_dec(ctx, length, s.height, s, 'sc'); };
	return s;
};
var scale_SCdec_down = function (height, options) {
	var s = new scale_SCdec(height, options);
	s.draw = function (ctx, length) { draw_sine_cosine_dec(ctx, length, - s.height, s, 'sc'); };
	return s;
};
var scale_CSdec = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { return Math.asin(Math.pow(10, location - 1)) * 180 / Math.PI; };
	s.location = function (value) { return 1 + Math.log10(Math.sin(value * Math.PI / 180)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_sine_cosine_dec(ctx, length, s.height, s, 'cs'); };
	return s;
};
var scale_CSdec_down = function (height, options) {
	var s = new scale_CSdec(height, options);
	s.draw = function (ctx, length) { draw_sine_cosine_dec(ctx, length, - s.height, s, 'cs'); };
	return s;
};
var scale_ISTd = inherit(spacer);
scale_ISTd.prototype.locationSd = function (value) {
	if (value === 0) return Math.log10(180 / Math.PI) - 1;
	return Math.log10(value * 0.1 / Math.sin(value * Math.PI / 180));
};
scale_ISTd.prototype.locationISd = function (value) {
	if (value === 0) return Math.log10(Math.PI / 1.8);
	return 1.0 - Math.log10(18 * Math.asin(value) / Math.PI / value);
};
scale_ISTd.prototype.locationTd = function (value) {
	var tangent = Math.tan(value * Math.PI / 180);
	return Math.log10(value * 0.1 / tangent);
};
scale_ISTd.prototype.locationITd = function (value) {
	if (value === 0) return Math.log10(Math.PI / 1.8);
	var alpha = Math.atan(value) * 18 / Math.PI;
	return 1.0 - Math.log10(alpha / value);
};
scale_ISTd.prototype.valueSd = function (location) {
	var from = 0, to = 90;
	var v;
	while (to - from > 0.000001) {
		var point = (from + to) / 2;
		v = this.locationSd(point);
		if (v < location) from = point; else to = point;
	}
	return from;
};
scale_ISTd.prototype.valueTd = function (location) {
	var from = 0, to = 90;
	var v;
	while (to - from > 0.000001) {
		var point = (from + to) / 2;
		v = this.locationTd(point);
		if (v > location) from = point; else to = point;
	}
	return from;
};
scale_ISTd.prototype.valueITd = function (location) {
	var from = 0, to = 1.8;
	var v;
	while (to - from > 0.000001) {
		var point = (from + to) / 2;
		v = this.locationITd(point);
		if (v < location) from = point; else to = point;
	}
	return from;
};
scale_ISTd.prototype.valueISd = function (location) {
	var from = 0, to = 1;
	var v;
	while (to - from > 0.000001) {
		var point = (from + to) / 2;
		v = this.locationISd(point);
		if (v > location) from = point; else to = point;
	}
	return from;
};
scale_ISTd.prototype.value = function (location) {
	if (location >= Math.log10(18 / Math.PI) && location <= Math.log10(9)) return this.valueSd(location);
	if (location >= this.locationTd(61) && location < Math.log10(18 / Math.PI)) return this.valueTd(location);
	if (location >= this.locationITd(0) && location < this.locationITd(1.8)) return this.valueITd(location);
	if (location > 0 && location < this.locationISd(0)) return this.valueISd(location);
	return null;
};
scale_ISTd.prototype.location = function (value, location) {
	if (value > 60) return this.locationSd(value);
	if (location >= Math.log10(18 / Math.PI)) return this.locationSd(value);
	if (value > 1.8 || location > this.locationTd(61)) return this.locationTd(value);
	if (location >= Math.log10(Math.PI / 1.8)) return this.locationITd(value);
	return this.locationISd(value);
};
scale_ISTd.prototype.drawISTd = function (ctx, length, height) {
	var h5 = height * 0.5; var h4 = height * 0.4; var h3 = height * 0.3; var h2 = height * 0.2;
	draw_XR(ctx, this.locationSd, length, 40, 90, 1, h3, 10, 5, 10);
	draw_XR(ctx, this.locationSd, length, 40, 90, 1, h2, 5, 1, 5);
	draw_XR(ctx, this.locationSd, length, 20, 40, 1, h2, 10, 2, 10);
	mark(ctx, '90\u00b0', this.locationSd(90) * length, h5);
	mark(ctx, 80, this.locationSd(80) * length, h5);
	mark(ctx, 70, this.locationSd(70) * length, h5);
	mark(ctx, 60, this.locationSd(60) * length, h5);
	mark(ctx, 50, this.locationSd(50) * length, h5);
	mark(ctx, 40, this.locationSd(40) * length, h5);
	mark(ctx, 30, this.locationSd(30) * length, h5);
	mark(ctx, 20, this.locationSd(20) * length, h5);
	tick(ctx, this.locationSd(10) * length, h5);
	tick(ctx, this.locationSd(15) * length, h2);
	smark(ctx, 0, this.locationSd(0) * length, h3, h5);
	smark(ctx, 0, this.locationITd(0) * length, h4, h5);
	tick(ctx, this.locationITd(0.1) * length, h3);
	tick(ctx, this.locationITd(0.15) * length, h2);
	tick(ctx, this.locationITd(0.2) * length, h3);
	tick(ctx, this.locationITd(0.25) * length, h2);
	mark(ctx, '.3', this.locationITd(0.3) * length, h5);
	mark(ctx, '.4', this.locationITd(0.4) * length, h5);
	mark(ctx, '.5', this.locationITd(0.5) * length, h5);
	mark(ctx, '.6', this.locationITd(0.6) * length, h5);
	mark(ctx, '.7', this.locationITd(0.7) * length, h5);
	mark(ctx, '.8', this.locationITd(0.8) * length, h5);
	mark(ctx, '.9', this.locationITd(0.9) * length, h5);
	mark(ctx, '1.0', this.locationITd(1) * length, h5);
	mark(ctx, '1.1', this.locationITd(1.1) * length, h5);
	mark(ctx, '1.2', this.locationITd(1.2) * length, h5);
	mark(ctx, '1.3', this.locationITd(1.3) * length, h5);
	mark(ctx, '1.4', this.locationITd(1.4) * length, h5);
	mark(ctx, '1.5', this.locationITd(1.5) * length, h5);
	mark(ctx, '1.6', this.locationITd(1.6) * length, h5);
	mark(ctx, '1.7', this.locationITd(1.7) * length, h5);
	draw_XR(ctx, this.locationITd, length, 0.3, 1.7, 1, h2, 0.1, 0.02, 0.1);
	tick(ctx, this.locationITd(1.72) * length, h2);
	tick(ctx, this.locationITd(1.74) * length, h2);
	tick(ctx, this.locationITd(1.76) * length, h2);
	ctx.fillStyle = this.marking_alt ? this.marking_alt : this.alt; ctx.strokeStyle = this.alt;
	tick(ctx, this.locationISd(0.1) * length, h3);
	tick(ctx, this.locationISd(0.2) * length, h3);
	tick(ctx, this.locationISd(0.25) * length, h2);
	tick(ctx, this.locationISd(0.3) * length, h3);
	tick(ctx, this.locationISd(0.35) * length, h2);
	mark(ctx, '.4', this.locationISd(0.4) * length, h5);
	tick(ctx, this.locationISd(0.45) * length, h2);
	mark(ctx, '.5', this.locationISd(0.5) * length, h5);
	mark(ctx, '.6', this.locationISd(0.6) * length, h5);
	mark(ctx, '.7', this.locationISd(0.7) * length, h5);
	mark(ctx, '.8', this.locationISd(0.8) * length, h5);
	mark(ctx, '.9', this.locationISd(0.9) * length, h5);
	mark(ctx, '.95', this.locationISd(0.95) * length, h5);
	mark(ctx, '.99', this.locationISd(0.99) * length, h5);
	mark(ctx, '1.0', this.locationISd(1) * length, h5);
	tick(ctx, this.locationISd(0.995) * length, h3);
	draw_XR(ctx, this.locationISd, length, 0.99, 1, 1, h2, 0.005, 0.001, 0.005);
	draw_XR(ctx, this.locationISd, length, 0.9, 0.99, 1, h3, 0.05, 0.01, 0.05);
	draw_XR(ctx, this.locationISd, length, 0.9, 0.99, 1, h2, 0.01, 0.005, 0.01);
	draw_XR(ctx, this.locationISd, length, 0.7, 0.9, 1, h3, 0.1, 0.05, 0.1);
	draw_XR(ctx, this.locationISd, length, 0.7, 0.9, 1, h2, 0.05, 0.01, 0.05);
	draw_XR(ctx, this.locationISd, length, 0.5, 0.7, 1, h2, 0.1, 0.02, 0.1);
	mark(ctx, 20, this.locationTd(20) * length, h5);
	mark(ctx, 30, this.locationTd(30) * length, h5);
	mark(ctx, 40, this.locationTd(40) * length, h5);
	mark(ctx, 50, this.locationTd(50) * length, h5);
	mark(ctx, '60\u00b0', this.locationTd(60) * length, h5);
	draw_XR(ctx, this.locationTd, length, 40, 60, 1, h4, 10, 5, 10);
	draw_XR(ctx, this.locationTd, length, 40, 60, 1, h3, 5, 1, 5);
	draw_XR(ctx, this.locationTd, length, 40, 60, 1, h2, 1, 0.5, 1);
	draw_XR(ctx, this.locationTd, length, 20, 40, 1, h3, 10, 5, 10);
	draw_XR(ctx, this.locationTd, length, 20, 40, 1, h2, 5, 1, 5);
	draw_XR(ctx, this.locationTd, length, 10, 20, 1, h2, 10, 2, 10);
	tick(ctx, this.locationTd(10) * length, h5);
	tick(ctx, this.locationTd(5) * length, h2);
};
scale_ISTd.prototype.draw = function (ctx, length) { ctx.translate(0, s.height); this.drawISTd(ctx, length, this.height); };

var scale_ISTd_down = inherit(scale_ISTd);
scale_ISTd_down.prototype.draw = function (ctx, length) { this.drawISTd(ctx, length, - this.height); };

var scale_P = inherit(spacer);
scale_P.prototype.value = function (location) { var ret = Math.pow(10, location - 1); return Math.sqrt(1 - ret * ret); };
scale_P.prototype.location = function (value) { return 1 + Math.log10(Math.sqrt(1 - value * value)); };
scale_P.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_pe(ctx, length, this.height, this); };
var scale_P_down = inherit(scale_P);
scale_P_down.prototype.draw = function (ctx, length) { draw_pe(ctx, length, - this.height, this); };
var scale_PH = inherit(spacer);
scale_PH.prototype.value = function (location) { var ret = Math.pow(10, location - 1); return Math.sqrt(ret * ret + 1); };
scale_PH.prototype.location = function (value) { return 1 + Math.log10(Math.sqrt(value * value - 1)); };
scale_PH.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_ph(ctx, length, this.height, this); };
var scale_PH_down = inherit(scale_PH);
scale_PH_down.prototype.draw = function (ctx, length) { draw_ph(ctx, length, - this.height, this); };
var scale_PH2 = inherit(spacer);
scale_PH2.prototype.value = function (location) { var ret = Math.pow(10, location); return Math.sqrt(ret * ret + 1); };
scale_PH2.prototype.location = function (value) { return Math.log10(Math.sqrt(value * value - 1)); };
scale_PH2.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_ph2(ctx, length, this.height, this); };
var scale_PH2_down = inherit(scale_PH2);
scale_PH2_down.prototype.draw = function (ctx, length) { draw_ph2(ctx, length, - this.height, this); };
var scale_PT = inherit(spacer);
scale_PT.prototype.value = function (location) { var x = Math.pow(10, location); x *= x; x -= 1; return Math.sqrt(x); };
scale_PT.prototype.location = function (value) { return Math.log10(Math.sqrt(1 + value * value)); };
scale_PT.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_pt(ctx, length, this.height, this); };
var scale_PT_down = inherit(scale_PT);
scale_PT_down.prototype.draw = function (ctx, length) { draw_pt(ctx, length, - this.height, this); };
var scale_LL3 = inherit(spacer);
scale_LL3.prototype.value = function (location) { return Math.pow(Math.E, Math.pow(10, location)); };
scale_LL3.prototype.location = function (value) { return Math.log10(Math.log(value)); };
scale_LL3.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_LL3(ctx, length, this.height, this); };
var scale_LL3_down = inherit(scale_LL3);
scale_LL3_down.prototype.draw = function (ctx, length) { draw_LL3(ctx, length, - this.height, this); };
var scale_LL2 = inherit(spacer);
scale_LL2.prototype.value = function (location) { return Math.pow(Math.E, Math.pow(10, location - 1)); };
scale_LL2.prototype.location = function (value) { return 1 + Math.log10(Math.log(value)); };
scale_LL2.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_LL2(ctx, length, this.height, this); };
var scale_LL2_down = inherit(scale_LL2);
scale_LL2_down.prototype.draw = function (ctx, length) { draw_LL2(ctx, length, - this.height, this); };
var scale_LL1 = inherit(spacer);
scale_LL1.prototype.value = function (location) { return Math.pow(Math.E, Math.pow(10, location - 2)); };
scale_LL1.prototype.location = function (value) { return 2 + Math.log10(Math.log(value)); };
scale_LL1.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_LL1(ctx, length, this.height, this); };
var scale_LL1_down = inherit(scale_LL1);
scale_LL1_down.prototype.draw = function (ctx, length) { draw_LL1(ctx, length, - this.height, this); };
var scale_LL0 = inherit(spacer);
scale_LL0.prototype.value = function (location) { return Math.pow(Math.E, Math.pow(10, location - 3)); };
scale_LL0.prototype.location = function (value) { return 3 + Math.log10(Math.log(value)); };
scale_LL0.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_LL0(ctx, length, this.height, this); };
var scale_LL0_down = inherit(scale_LL0);
scale_LL0_down.prototype.draw = function (ctx, length) { draw_LL0(ctx, length, - this.height, this); };
var scale_CLL0 = inherit(scale_C);
scale_CLL0.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_log_ll0(ctx, length, this.height, this); };
var scale_DLL0 = inherit(scale_D);
scale_DLL0.prototype.draw = function (ctx, length) { draw_log_ll0(ctx, length, - this.height, this); };
var scale_LL03 = inherit(spacer);
scale_LL03.prototype.value = function (location) { return Math.pow(Math.E, - Math.pow(10, location)); };
scale_LL03.prototype.location = function (value) { return Math.log10(- Math.log(value)); };
scale_LL03.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_LL03(ctx, length, this.height, this); };
var scale_LL03_down = inherit(scale_LL03);
scale_LL03_down.prototype.draw = function (ctx, length) { draw_LL03(ctx, length, - this.height, this); };
var scale_LL02 = inherit(spacer);
scale_LL02.prototype.value = function (location) { return Math.pow(Math.E, - Math.pow(10, location - 1)); };
scale_LL02.prototype.location = function (value) { return 1 + Math.log10(- Math.log(value)); };
scale_LL02.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_LL02(ctx, length, this.height, this); };
var scale_LL02_down = inherit(scale_LL02);
scale_LL02_down.prototype.draw = function (ctx, length) { draw_LL02(ctx, length, - this.height, this); };
var scale_LL01 = inherit(spacer);
scale_LL01.prototype.value = function (location) { return Math.pow(Math.E, - Math.pow(10, location - 2)); };
scale_LL01.prototype.location = function (value) { return 2 + Math.log10(- Math.log(value)); };
scale_LL01.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_LL01(ctx, length, this.height, this); };
var scale_LL01_down = inherit(scale_LL01);
scale_LL01_down.prototype.draw = function (ctx, length) { draw_LL01(ctx, length, - this.height, this); };
var scale_LL00 = inherit(spacer);
scale_LL00.prototype.value = function (location) { return Math.pow(Math.E, - Math.pow(10, location - 3)); };
scale_LL00.prototype.location = function (value) { return 3 + Math.log10(- Math.log(value)); };
scale_LL00.prototype.draw = function (ctx, length) { ctx.translate(0, this.height); draw_LL00(ctx, length, this.height, this); };
var scale_LL00_down = inherit(scale_LL00);
scale_LL00_down.prototype.draw = function (ctx, length) { draw_LL00(ctx, length, - this.height, this); };
var scale_SINH2rad = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { location = Math.pow(10, location); return Math.log(location + Math.sqrt(location * location + 1)); };
	s.location = function (value) { return Math.log10(0.5 * (Math.pow(Math.E, value) - Math.pow(Math.E, - value))); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_sinh2_rad(ctx, length, s.height, s); };
	return s;
};
var scale_SINH2rad_down = function (height, options) {
	var s = new scale_SINH2rad(height, options);
	s.draw = function (ctx, length) { draw_sinh2_rad(ctx, length, - s.height, s); };
	return s;
};
var scale_SINH1rad = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { location = Math.pow(10, location - 1); return Math.log(location + Math.sqrt(location * location + 1)); };
	s.location = function (value) { return 1 + Math.log10(0.5 * (Math.pow(Math.E, value) - Math.pow(Math.E, - value))); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_sinh1_rad(ctx, length, s.height, s); };
	return s;
};
var scale_SINH1rad_down = function (height, options) {
	var s = new scale_SINH1rad(height, options);
	s.draw = function (ctx, length) { draw_sinh1_rad(ctx, length, - s.height, s); };
	return s;
};
var scale_SINH1grad = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { location = Math.pow(10, location - 1); return Math.log(location + Math.sqrt(location * location + 1)) * 200 / Math.PI; };
	s.location = function (value) { value *= Math.PI / 200; return 1 + Math.log10(0.5 * (Math.pow(Math.E, value) - Math.pow(Math.E, - value))); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_sinh(ctx, length, s.height, s); };
	return s;
};
var scale_SINH1grad_down = function (height, options) {
	var s = new scale_SINH1grad(height, options);
	s.draw = function (ctx, length) { draw_sinh(ctx, length, - s.height, s); };
	return s;
};
var scale_SINH2grad = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { location = Math.pow(10, location); return Math.log(location + Math.sqrt(location * location + 1)) * 200 / Math.PI; };
	s.location = function (value) { value *= Math.PI / 200; return Math.log10(0.5 * (Math.pow(Math.E, value) - Math.pow(Math.E, - value))); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_sinh2(ctx, length, s.height, s); };
	return s;
};
var scale_SINH2grad_down = function (height, options) {
	var s = new scale_SINH2grad(height, options);
	s.draw = function (ctx, length) { draw_sinh2(ctx, length, - s.height, s); };
	return s;
};
var scale_COSHrad = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { location = Math.pow(10, location); return Math.log(location + Math.sqrt(location - 1) * Math.sqrt(location + 1)); };
	s.location = function (value) { return Math.log10(0.5 * (Math.pow(Math.E, value) + Math.pow(Math.E, - value))); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_cosh_rad(ctx, length, s.height, s); };
	return s;
};
var scale_COSHrad_down = function (height, options) {
	var s = new scale_COSHrad(height, options);
	s.draw = function (ctx, length) { draw_cosh_rad(ctx, length, - s.height, s); };
	return s;
};
var scale_COSHgrad = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { location = Math.pow(10, location); return Math.log(location + Math.sqrt(location - 1) * Math.sqrt(location + 1)) * 200 / Math.PI; };
	s.location = function (value) { value *= Math.PI / 200; return Math.log10(0.5 * (Math.pow(Math.E, value) + Math.pow(Math.E, - value))); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_cosh(ctx, length, s.height, s); };
	return s;
};
var scale_COSHgrad_down = function (height, options) {
	var s = new scale_COSHgrad(height, options);
	s.draw = function (ctx, length) { draw_cosh(ctx, length, - s.height, s); };
	return s;
};
var scale_TANHrad = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { location = Math.pow(10, location - 1); if (location >= 1) location = 2; return 0.5 * Math.log((1 + location) / (1 - location)); };
	s.location = function (value) { value *= 2; value = Math.pow(Math.E, value); return 1 + Math.log10((value - 1) / (value + 1)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_tanh_rad(ctx, length, s.height, s); };
	return s;
};
var scale_TANHrad_down = function (height, options) {
	var s = new scale_TANHrad(height, options);
	s.draw = function (ctx, length) { draw_tanh_rad(ctx, length, - s.height, s); };
	return s;
};
var scale_TANHgrad = function (height, options) {
	var s = new spacer(height, options);
	s.value = function (location) { location = Math.pow(10, location - 1); if (location >= 1) location = 2; return 100 * Math.log((1 + location) / (1 - location)) / Math.PI; };
	s.location = function (value) { value *= Math.PI / 100; value = Math.pow(Math.E, value); return 1 + Math.log10((value - 1) / (value + 1)); };
	s.draw = function (ctx, length) { ctx.translate(0, s.height); draw_tanh(ctx, length, s.height, s); };
	return s;
};
var scale_TANHgrad_down = function (height, options) {
	var s = new scale_TANHgrad(height, options);
	s.draw = function (ctx, length) { draw_tanh(ctx, length, - s.height, s); };
	return s;
};
var scale_CONST = inherit(spacer);
scale_CONST.prototype.location = function (value) { return Math.log10(value); };
scale_CONST.prototype.value = function (location) { return Math.pow(10, location); };
scale_CONST.prototype.marks = [];
scale_CONST.prototype.draw = function (ctx, length) {
	ctx.translate(0, this.height);
	var h5 = this.height * 0.5;
	for (var ind in this.marks) {
		if (this.marks.hasOwnProperty(ind)) {
			mark(ctx, ind, this.marks[ind] * length, h5);
		}
	}
};
scale_CONST.prototype.read = function (position) {
	for (var ind in this.marks) {
		if (ind.toLowerCase() === position.toLowerCase()) return Math.pow(10, this.marks[ind]);
	}
	return null;
};