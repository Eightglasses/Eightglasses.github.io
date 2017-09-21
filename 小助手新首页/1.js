var base = {};
base.lPrincipal = 0;
base.lMaxRepayAmount = 0;
base.lInterest = 0;
base.lOverdueAmount = 0;
base.strBeforeBillDate = "";
base.strBorrowerMonthRate = 0;
base.lId = "";
base.totalAmount = 0;
base.oldAmount = 0;
base.end_fj = 0;
base.nInterestRepayed = 0;
base.serviceDate = "";
base.nReduce = 0;
base.nReduceDays = 0;
base.strBorrowEndDate = "";
base.lUserId = "";
base.url = "";
base.strAmount = 0;
base.strCreateTime = "";
base.strVersionType = "";
base.nOpen = 0;
base.nOverdueFlag = -1;
base.byRepayWay = "";
window.onload = function() {
	_shade_layer.show("努力加载中,请稍候...");
	initPara();
	if (base.nStage == "1" && base.lBorrowBillId != null) {
		var d = getCacheData("lOverdueAmount");
		var a = getCacheData("lInterest");
		var c = getCacheData("lPrincipal");
		var b = getCacheData("lTotalAmount");
		$("#nc_yhbj").html(c);
		$("#nc_yhlx").html(a);
		$("#nc_yhfwf").html(d);
		$("#nc_zje").html(b);
		$("#noCalDiv").show();
		_shade_layer.hide()
	} else {
		if (base.lBorrowBillId != null) {
			setBillData()
		} else {
			$("#borrowhr_account").show();
			console.log(base.nBorrowMode);
			getBorrowBaseParams(base.lId, base.nBorrowMode)
		}
	}
};
function initPara() {
	base.strAuthorizeNum = getQueryString("strAuthorizeNum");
	base.strConsultNo = getQueryString("strConsultNo");
	base.strContractNo = getQueryString("strContractNo");
	base.payTypeBorrow = getQueryString("payTypeBorrow");
	base.lBorrowBillId = getQueryString("lBorrowBillId");
	base.payType = getQueryString("payType");
	base.lId = getQueryString("lId");
	base.strBorrowerMonthRate = getQueryString("strBorrowerMonthRate");
	base.url = getQueryString("url");
	base.strAmount = getQueryString("strAmount");
	base.strCreateTime = getQueryString("strCreateTime");
	base.strVersionType = getQueryString("strVersionType");
	base.strConsultNo = getQueryString("strConsultNo");
	base.strContractNo = getQueryString("strContractNo");
	base.nStage = getQueryString("nStage");
	base.lUserId = getStringValue("lUserId");
	base.nOverdueFlag = getQueryString("nOverdueFlag");
	base.byRepayWay = getQueryString("byRepayWay");
	base.nBorrowMode = EngineClass.getStringValue("myBorrowPage_nBorrowMode");
	setBackURL(base.url, "我的还款", "payTypeBorrow=" + base.payTypeBorrow + "&strContractNo=" + base.strContractNo + "&strConsultNo=" + base.strConsultNo + "&strAuthorizeNum=" + base.strAuthorizeNum + "&lId=" + base.lId + "&strBorrowerMonthRate=" + base.strBorrowerMonthRate + "&strVersionType=" + base.strVersionType + "&strAmount=" + base.strAmount + "&strCreateTime=" + base.strCreateTime + "&nOverdueFlag=" + base.nOverdueFlag + "&byRepayWay=" + base.byRepayWay, 1, "");
	if (base.nBorrowMode == 1 || base.nBorrowMode == 28) {
		var a = new CDO();
		a.setStringValue("strServiceName", "BorrowProductService");
		a.setStringValue("strTransName", "getUserBackCardState");
		a.setLongValue("nBorrowMode", 1);
		raiseTrans(a, "callBackGetUserBackCardState")
	}
}
function setBillData() {
	base.payType = 0;
	$("#borrowhr_account").hide();
	var g = getQueryString("lInterest");
	var h = getQueryString("lOverdueAmount");
	var a = getQueryString("money");
	var f = a * 100 - g * 100 - h * 100;
	$("#user_lx").html(g);
	$("#user_fj").html(h);
	$("#user_totalAmount").html(a);
	if (f > 0) {
		f = parseFloat((Number(f) / 100).toFixed(2));
		$("#user_yhbj").html(f);
		$("#user_yhbj_div").show()
	} else {
		$("#he_yhbj_div").hide();
		$("#he_yhlx_div").hide();
		$("#he_bjyqfx").hide();
		$("#he_yqglf_div").hide();
		$("#he_bjyqfx_div").hide()
	}
	if (base.nBorrowMode == 1) {
		if (f > 0) {
			$("#he_yhbj").html(EngineClass.getStringValue("her_lPrincipal"));
			$("#he_yhlx").html(EngineClass.getStringValue("her_lHaierInterest"));
			$("#he_bjyqfx").html(EngineClass.getStringValue("her_lHaierOverdueAmount"));
			$("#he_yqglf").html(EngineClass.getStringValue("her_lOverduePrincipalAmount"))
		}
		$("#he_zje").html(a);
		$("#he_yhfwf").html(g);
		$("#he_fwfwyj").html(h);
		$("#haierDiv").show()
	} else {
		if (base.nBorrowMode == 28) {
			var e = EngineClass.getStringValue("lastZd");
			if (e == "true") {
				$("#nhe_yhbj").html(EngineClass.getStringValue("her_lPrincipal"));
				$("#nhe_yhlx").html(EngineClass.getStringValue("her_lHaierInterest"));
				$("#nhe_bjyqfx").html(EngineClass.getStringValue("her_lHaierOverdueAmount"));
				$("#nhe_yqglf").html(EngineClass.getStringValue("her_lOverduePrincipalAmount"))
			} else {
				$("#nhe_yhbj_div").hide();
				$("#nhe_yhlx_div").hide();
				$("#nhe_bjyqfx").hide();
				$("#nhe_yqglf_div").hide();
				$("#nhe_bjyqfx_div").hide()
			}
			$("#nhe_zje").html(a);
			$("#nhe_yhfwf").html(g);
			$("#nhe_fwfwyj
").html(h);
			$("#newhaierDiv").show()
		} else {
			if (base.nBorrowMode == 4) {
				var i = getQueryString("lLoanFee");
				var k = getQueryString("lOverdueLoanFee");
				var d = getQueryString("lPrincipal");
				$("#hx_yhbj").html(d);
				$("#hx_yhlx").html(g);
				$("#hx_yqfx").html(h);
				$("#hx_fff").html(i);
				$("#hx_wyj").html(k);
				$("#hx_dhkzjh").html(a);
				$("#hxDiv").show()
			} else {
				if (base.nBorrowMode == 26 || base.nBorrowMode == 16) {
					var c = getQueryString("lBreachAmount");
					var h = getQueryString("lOverdueAmount");
					var j = getQueryString("lPartnerInterest");
					var b = getQueryString("lPlatformServiceFee");
					var d = getQueryString("lPrincipal");
					$("#bsb_yhbj").html(d);
					$("#bsb_yhlx").html(j);
					$("#bsb_yhfwf").html(b);
					if (Number(c) == 0) {
						$("#bsb_fwfwyj").html(h)
					} else {
						$("#bsb_fwfwyj").html("0")
					}
					$("#bsb_bjyqfx").html("0");
					$("#bsb_yqglf").html(c);
					$("#bsb_zje").html(a);
					$("#bsbDiv").show()
				} else {
					$("#xianjindaiDiv").show()
				}
			}
		}
	}
	_shade_layer.hide()
}
function getBorrowBaseParams(d, b) {
	var c = new CDO();
	var a = getStringValue("lUserId");
	c.setStringValue("strServiceName", "BorrowerRepaymentService");
	c.setStringValue("strTransName", "getMobilePrePaymentAmount");
	c.setLongValue("lBorrowerId", Number(a));
	c.setLongValue("lBorrowIntentId", d);
	c.setIntegerValue("nHaier", Number(b));
	raiseTrans(c, "callBackForGetBorrowBaseParams")
}
function callBackForGetBorrowBaseParams(m, p, q) {
	_shade_layer.hide();
	if (q == undefined || q == null) {
		info("网络异常");
		return
	}
	try {
		if (q.nCode == 0) {
			var f = p.getStringValue("lPrincipal") || 0;
			var o = p.getStringValue("lInterest") || 0;
			var t = p.getStringValue("lHaierInterest") || 0;
			var a = p.getStringValue("lOverdueInterest") || 0;
			var g = p.getStringValue("lHaierOverdueAmount") || 0;
			var h = p.getStringValue("lOverdueAmount") || 0;
			var l = p.getStringValue("lSumAmount") || 0;
			base.nReduce = p.getIntegerValue("nReduce") || 0;
			base.nReduceDays = p.getIntegerValue("nReduceDays") || 0;
			if (base.nBorrowMode == 1) {
				$("#he_yhbj").html(f);
				$("#he_yhlx").html(t);
				$("#he_yhfwf").html(o);
				$("#he_fwfwyj").html(a);
				$("#he_bjyqfx").html(g);
				$("#he_yqglf").html(h);
				$("#he_zje").html(l);
				$("#haierDiv").show()
			}
			if (base.nBorrowMode == 28) {
				var r = p.getStringValue("lBreachAmount") || 0;
				var b = p.getStringValue("lOverdueFundPrincipalAmount") || 0;
				var i = p.getStringValue("lLoanFee") || 0;
				var c = p.getStringValue("lOverdueLoanFee") || 0;
				var s = p.getStringValue("lPenaltyInterest") || 0;
				var d = p.getStringValue("lPartnerInterest") || 0;
				$("#nhe_yhbj").html((Number(f) / 100).toFixed(2));
				$("#nhe_yhlx").html((Number(d) / 100).toFixed(2));
				$("#nhe_yhfwf").html((Number(o) / 100).toFixed(2));
				$("#nhe_fwfwyj").html((Number(s) / 100).toFixed(2));
				$("#nhe_bjyqfx").html((Number(b) / 100).toFixed(2));
				$("#nhe_yqglf").html((Number(r) / 100).toFixed(2));
				$("#nhe_zje").html((Number(l) / 100).toFixed(2));
				$("#newhaierDiv").show()
			} else {
				if (base.nBorrowMode == 4) {
					$("#hx_yhbj").html(fMoney(f));
					$("#hx_yhlx").html(fMoney(o));
					$("#hx_yqfx").html(fMoney(h));
					$("#hx_fff").html(fMoney(p.getStringValue("lLoanFee")));
					$("#hx_wyj").html(fMoney(p.getStringValue("lOverdueLoanFee")));
					$("#hx_dhkzjh").html(fMoney(p.getStringValue("lSumAmount")));
					$("#hxDiv").show()
				} else {
					if (base.nBorrowMode == 26 || base.nBorrowMode == 16) {
						base.strValueDate = p.getStringValue("strValueDate");
						var k = p.getStringValue("lPlatformServiceFee");
						var r = p.getStringValue("lBreachAmount");
						base.lPrincipal = f;
						base.lInterest = o;
						base.lOverdueAmount = h;
						base.lMaxRepayAmount = p.getStringValue("lMaxRepayAmount");
						base.strBeforeBillDate = p.getStringValue("strBeforeBillDate");
						base.nInterestRepayed = p.getStringValue("nInterestRepayed");
						base.serviceDate = p.getStringValue("dtNow");
						base.strBorrowEndDate = p.exists("strBorrowEndDate") ? p.getStringValue("strBorrowEndDate") : "";
						base.lMaxRepayAmount = base.lMaxRepayAmount / 100;
						var j = p.getCDOValue("cdoBorrowIntent");
						base.nPartnerYearRate = j.getIntegerValue("nPartnerYearRate");
						base.nBorrowerMonthRate = j.getIntegerValue("nBorrowerMonthRate");
						base.baseFee = p.getStringValue("baseFee");
						base.lInterest = base.lInterest;
						base.lOverdueAmount = base.lOverdueAmount;
						base.lOverdueInterest = a;
						base.lPlatformServiceFee = k;
						base.lBreachAmount = r;
						base.lSumAmount = l;
						$("#bsbDiv").show()
					} else {
						if (p.exists("nNeedCalRepay") && p.getIntegerValue("nNeedCalRepay") == 0) {
							if (base.nBorrowMode == 43) {
								$("#nc_tqhkwyj").html((Number(r) / 100).toFixed(2));
								$("#he_t
qhkwyj_div").show()
							}
							$("#nc_yhbj").html((Number(f) / 100).toFixed(2));
							$("#nc_yhlx").html((Number(o) / 100).toFixed(2));
							$("#nc_yhfwf").html((Number(h) / 100).toFixed(2));
							$("#nc_zje").html((Number(l) / 100).toFixed(2));
							$("#noCalDiv").show()
						} else {
							base.lPrincipal = f;
							base.lInterest = o;
							base.lOverdueAmount = h;
							base.lMaxRepayAmount = p.getStringValue("lMaxRepayAmount");
							base.strBeforeBillDate = p.getStringValue("strBeforeBillDate");
							base.nInterestRepayed = p.getStringValue("nInterestRepayed");
							base.serviceDate = p.getStringValue("dtNow");
							base.strBorrowEndDate = p.exists("strBorrowEndDate") ? p.getStringValue("strBorrowEndDate") : "";
							base.lMaxRepayAmount = base.lMaxRepayAmount / 100;
							base.lInterest = base.lInterest;
							base.lOverdueAmount = base.lOverdueAmount;
							$("#user_lx").html(fMoney(o));
							$("#user_fj").html(fMoney(h));
							$("#user_totalAmount").html(fMoney(l));
							base.oldAmount = Number(f / 100);
							$("#xianjindaiDiv").show()
						}
					}
				}
			}
		} else {
			info(q.strText);
			return
		}
	} catch(n) {
		info(n)
	}
	base.lPrincipal = base.lMaxRepayAmount;
	$("#user_principal").val(base.lPrincipal);
	if (base.nBorrowMode == 26 || base.nBorrowMode == 16) {
		repaymentCalculatorBSB(base)
	}
	$("#bsb_user_principal").bind("input propertychange",
	function() {
		var e = $("#bsb_user_principal").val();
		base.lPrincipal = e;
		repaymentCalculatorBSB(base)
	})
}
$("#user_principal").bind("input propertychange",
function() {
	var a = $("#user_principal").val();
	if (a * 100 > base.lMaxRepayAmount * 100) {
		$("#user_principal").val(base.oldAmount);
		info("您输入的本金已经超出最大可还本金金额,最大可还金额：" + base.lMaxRepayAmount);
		return
	}
	if (isNaN(a)) {
		$("#user_lx").html("");
		$("#user_fj").html("");
		$("#user_totalAmount").html("");
		base.totalAmount = 0
	} else {
		base.lPrincipal = a;
		repaymentCalculatorTwo(base)
	}
});
function repaymentCalculatorTwo(b) {
	var c = new CDO();
	var a = getStringValue("lUserId");
	c.setStringValue("strServiceName", "BorrowerRepaymentService");
	c.setStringValue("strTransName", "getMobilePrePaymentAmount");
	c.setLongValue("lBorrowerId", Number(a));
	c.setLongValue("lBorrowIntentId", b.lId);
	c.setIntegerValue("nHaier", Number(b.nBorrowMode));
	c.setIntegerValue("lRepayAmount", Number(b.lPrincipal * 100));
	raiseTrans(c, "callBackForCalBorrowBaseParams")
}
function callBackForCalBorrowBaseParams(b, i, m) {
	_shade_layer.hide();
	if (m == undefined || m == null) {
		info("网络异常");
		return
	}
	try {
		if (m.nCode == 0) {
			var d = i.getStringValue("lPrincipal");
			var f = i.getStringValue("lInterest");
			var j = i.getStringValue("lHaierInterest");
			var g = i.getStringValue("lOverdueInterest");
			var k = i.getStringValue("lHaierOverdueAmount");
			var h = i.getStringValue("lOverdueAmount");
			var a = i.getStringValue("lSumAmount");
			var c = i.getIntegerValue("lBreachAmount");
			base.nReduce = i.getIntegerValue("nReduce");
			base.nReduceDays = i.getIntegerValue("nReduceDays");
			base.lPrincipal = d;
			base.lInterest = f;
			base.lOverdueAmount = h;
			base.lMaxRepayAmount = i.getStringValue("lMaxRepayAmount");
			base.strBeforeBillDate = i.getStringValue("strBeforeBillDate");
			base.nInterestRepayed = i.getStringValue("nInterestRepayed");
			base.serviceDate = i.getStringValue("dtNow");
			base.strBorrowEndDate = i.exists("strBorrowEndDate") ? i.getStringValue("strBorrowEndDate") : "";
			base.lMaxRepayAmount = base.lMaxRepayAmount / 100;
			base.lInterest = base.lInterest;
			base.lOverdueAmount = base.lOverdueAmount;
			$("#user_lx").html(fMoney(f));
			$("#user_fj").html(fMoney(h));
			$("#user_totalAmount").html(fMoney(a));
			base.oldAmount = Number(d / 100)
		} else {
			info(m.strText);
			return
		}
	} catch(l) {
		info(l)
	}
}
function repaymentCalculatorBSB(b) {
	if (b.lPrincipal * 100 > b.lMaxRepayAmount * 100) {
		$("#bsb_user_principal").val(b.oldAmount);
		info("您输入的本金已经超出最大可还本金金额,最大可还金额：" + b.lMaxRepayAmount);
		return
	}
	var m = 0;
	var l = twoDateSize(b.strBeforeBillDate, b.serviceDate);
	if (l) {
		m = getDays(b.strBeforeBillDate, b.serviceDate);
		if (b.nInterestRepayed == 2) {
			m += 1
		}
	}
	var k = Number(b.nPartnerYearRate) / 10000;
	var d = ((Number(b.nBorrowerMonthRate) * 12 - Number(b.nPartnerYearRate)) / 10000 / 12).toFixed(4);
	var g = Number(getDays(b.strValueDate, b.serviceDate)) + 1;
	var f = (Number(b.lPrincipal) * (k * Number(g)) / 360).toFixed(2);
	var c = (Number(b.baseFee) / 100).toFixed(2);
	var h = ((Number(b.lPrincipal) * (d * Number(m)) / 30) + Number(c)).toFixed(2);
	if (b.strBorrowEndDate == "") {
		b.strBorrowEndDate = new Date().Format("yyyy-MM-dd")
	}
	var i = Number(b.lOverdueInterest) / 100;
	var e = 0;
	var j = twoDateSize(b.strBor rowEndDate, b.serviceDate);
	if (j) {
		var a = getDays(b.strBorrowEndDate, b.serviceDate);
		e = (Number(b.lPrincipal) * 0.005 * Number(a)).toFixed(2);
		if (Number(e) == 0) {
			b.end_fj = (Number(i) + Number(e)).toFixed(2)
		} else {
			b.end_fj = (Number(e)).toFixed(2)
		}
	} else {
		b.end_fj = 0
	}
	b.totalAmount = (Number(b.lPrincipal) + Number(f) + Number(h) + Number(i) + Number(b.end_fj)).toFixed(2);
	$("#bsb_borrowhr_account").show();
	$("#bsb_user_principal").val(Number(b.lPrincipal));
	$("#bsb_yhbj_div").hide();
	$("#bsb_yhlx").html(f);
	$("#bsb_yhfwf").html(h);
	$("#bsb_fwfwyj").html(i);
	$("#bsb_bjyqfx").html(0);
	$("#bsb_yqglf").html(e);
	$("#bsb_zje").html(b.totalAmount);
	b.oldAmount = b.lPrincipal
}
var flag = true;
function repay(e) {
	if ((e == 2 || e == 5) && base.payType == 1) {
		var i = e == 2 ? $("#user_principal").val() : $("#bsb_user_principal").val();
		if (isNaN(i)) {
			info("本金需为100整数倍");
			return false
		}
		if (Number(i) === 0 || Number(i) % 100 !== 0) {
			info("本金需为100整数倍");
			return false
		}
	}
	if (flag) {
		var n = base.payTypeBorrow.split(",");
		var k = n[1];
		var j = n[2];
		var m = n[0];
		var h = "";
		if (k == 1) {
			h += "0,"
		}
		if (j == 1) {
			h += "1,"
		}
		if (m == 1) {
			h += "2,"
		}
		var g = getQueryString("lId");
		var l = "";
		if (base.lBorrowBillId != null) {
			if (e == 1 && $("#haierNotBottom").hasClass("notBackButton")) {
				return false
			}
			var a = getQueryString("money");
			EngineClass.setDataToCache("payMoney", a);
			EngineClass.setDataToCache("strConfigPayType", h);
			EngineClass.setDataToCache("nPayType", "13");
			if (base.nBorrowMode == 4) {
				l = "lBorrowIntentId=" + g + "&lId=" + base.lBorrowBillId + "&nBorrowMode=" + base.nBorrowMode;
				setStringValue("GHB_payPara", l);
				EngineClass.openWindow("payCenter/huaxingpay.htm", "华兴收银台页面", "", 0)
			} else {
				EngineClass.openWindow("payCenter/pay.htm", "收银台页面", "lBorrowIntentId=" + g + "&lBillId=" + base.lBorrowBillId + "&nBorrowMode=" + base.nBorrowMode, 0)
			}
		} else {
			var c = 0;
			var d = 0;
			var f = 0;
			if (e == 1) {
				c = $("#he_zje").html();
				f = $("#he_yhbj").html();
				d = $("#he_zje").html();
				if ($("#haierNotBottom").hasClass("notBackButton")) {
					return false
				}
			}
			if (e == 7) {
				c = $("#nhe_zje").html();
				f = $("#nhe_yhbj").html();
				d = $("#nhe_zje").html();
				if ($("#nhaierNotBottom").hasClass("notBackButton")) {
					return false
				}
			} else {
				if (e == 2) {
					c = $("#user_totalAmount").html();
					d = $("#user_principal").val()
				} else {
					if (e == 3) {
						c = $("#hx_dhkzjh").html();
						d = $("#hx_dhkzjh").html()
					} else {
						if (e == 4) {
							c = $("#nc_zje").html();
							d = $("#nc_zje").html()
						} else {
							if (e == 5) {
								c = $("#bsb_zje").html();
								f = $("#bsb_user_principal").val();
								d = $("#bsb_user_principal").html()
							} else {
								if (e == 6) {
									c = $("#nhe_zje").html();
									f = $("#nhe_yhbj").html()
								}
							}
						}
					}
				}
			}
			d = d * 100;
			f = f * 100;
			d = Number(Number(d).toFixed(2));
			f = Number(Number(f).toFixed(2));
			EngineClass.setDataToCache("payMoney", c);
			EngineClass.setDataToCache("strConfigPayType", h);
			EngineClass.setDataToCache("nPayType", "12");
			var b = 0;
			if (f > 0) {
				b = f
			} else {
				b = d
			}
			if (base.nBorrowMode == 4) {
				l = "lBorrowIntentId=" + g + "&lAmount=" + d + "&nBorrowMode=" + base.nBorrowMode;
				setStringValue("GHB_payPara", l);
				EngineClass.openWindow("payCenter/huaxingpay.htm", "华兴收银台页面", "", 0)
			} else {
				EngineClass.openWindow("payCenter/pay.htm", "收银台页面", "lBorrowIntentId=" + g + "&lAmount=" + b + "&nBorrowMode=" + base.nBorrowMode, 0)
			}
		}
	}
}
var backUrl = function() {
	var a = "payTypeBorrow=" + base.payTypeBorrow + "&strContractNo=" + base.strContractNo + "&strConsultNo=" + base.strConsultNo + "&strAuthorizeNum=" + base.strAuthorizeNum + "&lId=" + base.lId + "&strBorrowerMonthRate=" + base.strBorrowerMonthRate + "&strAmount=" + base.strAmount + "&strCreateTime=" + base.strCreateTime + "&strVersionType=" + base.strVersionType + "&nOverdueFlag=" + base.nOverdueFlag + "&byRepayWay=" + base.byRepayWay;
	openDelayWindow(base.url, "我的借款", a, 1, "", 1)
};
var callBackGetUserBackCardState = function(b, c, a) {
	if (a == undefined || a == null) {
		_shade_layer.hide();
		info("网络异常");
		return
	}
	if (a.nCode == 0) {
		base.nOpen = c.getIntegerValue("nOpen");
		if (base.nOpen == 0 && c.exists("strNotice")) {
			base.strNotice = c.getStringValue("strNotice");
			$("#borrowHaierPopupText").html(base.strNotice);
			$("#HaierBackdrop").show();
			$("#content_HaierBankPop").show();
			$("#HaierBank_subset").animate({
				opacity: "1"
			},
			1000)
		} else {
			if (base.nOpen == 1) {
				$("#haierNotBottom").removeClass("notBackButton");
				$("#nhaierNotBottom").removeClass("notBackButton")
			}
		}
	} else {
		info(a.strText)
	}
};
function secondMate_Hide() {
	$("#HaierBank_subset").animate({
		opacity: "0.5"
	},
	500);
	$("#content_HaierBankPop").hide();
	$("#HaierBackdrop").hide()
}
function fMoney(a) {
	if (!a) {
		return 0
	}
	a = Number(a);
	return (a / 100).toFixed(2)
};