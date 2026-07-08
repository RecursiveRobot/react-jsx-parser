import e, { Fragment as t } from "react";
import { Fragment as n, jsx as r } from "react/jsx-runtime";
//#region \0rolldown/runtime.js
var i = Object.create, a = Object.defineProperty, o = Object.getOwnPropertyDescriptor, s = Object.getOwnPropertyNames, c = Object.getPrototypeOf, l = Object.prototype.hasOwnProperty, u = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), d = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = s(t), c = 0, u = i.length, d; c < u; c++) d = i[c], !l.call(e, d) && d !== n && a(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(r = o(t, d)) || r.enumerable
	});
	return e;
}, f = (e, t, n) => (n = e == null ? {} : i(c(e)), d(t || !e || !e.__esModule ? a(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), p = [
	509,
	0,
	227,
	0,
	150,
	4,
	294,
	9,
	1368,
	2,
	2,
	1,
	6,
	3,
	41,
	2,
	5,
	0,
	166,
	1,
	574,
	3,
	9,
	9,
	7,
	9,
	32,
	4,
	318,
	1,
	78,
	5,
	71,
	10,
	50,
	3,
	123,
	2,
	54,
	14,
	32,
	10,
	3,
	1,
	11,
	3,
	46,
	10,
	8,
	0,
	46,
	9,
	7,
	2,
	37,
	13,
	2,
	9,
	6,
	1,
	45,
	0,
	13,
	2,
	49,
	13,
	9,
	3,
	2,
	11,
	83,
	11,
	7,
	0,
	3,
	0,
	158,
	11,
	6,
	9,
	7,
	3,
	56,
	1,
	2,
	6,
	3,
	1,
	3,
	2,
	10,
	0,
	11,
	1,
	3,
	6,
	4,
	4,
	68,
	8,
	2,
	0,
	3,
	0,
	2,
	3,
	2,
	4,
	2,
	0,
	15,
	1,
	83,
	17,
	10,
	9,
	5,
	0,
	82,
	19,
	13,
	9,
	214,
	6,
	3,
	8,
	28,
	1,
	83,
	16,
	16,
	9,
	82,
	12,
	9,
	9,
	7,
	19,
	58,
	14,
	5,
	9,
	243,
	14,
	166,
	9,
	71,
	5,
	2,
	1,
	3,
	3,
	2,
	0,
	2,
	1,
	13,
	9,
	120,
	6,
	3,
	6,
	4,
	0,
	29,
	9,
	41,
	6,
	2,
	3,
	9,
	0,
	10,
	10,
	47,
	15,
	199,
	7,
	137,
	9,
	54,
	7,
	2,
	7,
	17,
	9,
	57,
	21,
	2,
	13,
	123,
	5,
	4,
	0,
	2,
	1,
	2,
	6,
	2,
	0,
	9,
	9,
	49,
	4,
	2,
	1,
	2,
	4,
	9,
	9,
	55,
	9,
	266,
	3,
	10,
	1,
	2,
	0,
	49,
	6,
	4,
	4,
	14,
	10,
	5350,
	0,
	7,
	14,
	11465,
	27,
	2343,
	9,
	87,
	9,
	39,
	4,
	60,
	6,
	26,
	9,
	535,
	9,
	470,
	0,
	2,
	54,
	8,
	3,
	82,
	0,
	12,
	1,
	19628,
	1,
	4178,
	9,
	519,
	45,
	3,
	22,
	543,
	4,
	4,
	5,
	9,
	7,
	3,
	6,
	31,
	3,
	149,
	2,
	1418,
	49,
	513,
	54,
	5,
	49,
	9,
	0,
	15,
	0,
	23,
	4,
	2,
	14,
	1361,
	6,
	2,
	16,
	3,
	6,
	2,
	1,
	2,
	4,
	101,
	0,
	161,
	6,
	10,
	9,
	357,
	0,
	62,
	13,
	499,
	13,
	245,
	1,
	2,
	9,
	233,
	0,
	3,
	0,
	8,
	1,
	6,
	0,
	475,
	6,
	110,
	6,
	6,
	9,
	4759,
	9,
	787719,
	239
], m = [
	0,
	11,
	2,
	25,
	2,
	18,
	2,
	1,
	2,
	14,
	3,
	13,
	35,
	122,
	70,
	52,
	268,
	28,
	4,
	48,
	48,
	31,
	14,
	29,
	6,
	37,
	11,
	29,
	3,
	35,
	5,
	7,
	2,
	4,
	43,
	157,
	19,
	35,
	5,
	35,
	5,
	39,
	9,
	51,
	13,
	10,
	2,
	14,
	2,
	6,
	2,
	1,
	2,
	10,
	2,
	14,
	2,
	6,
	2,
	1,
	4,
	51,
	13,
	310,
	10,
	21,
	11,
	7,
	25,
	5,
	2,
	41,
	2,
	8,
	70,
	5,
	3,
	0,
	2,
	43,
	2,
	1,
	4,
	0,
	3,
	22,
	11,
	22,
	10,
	30,
	66,
	18,
	2,
	1,
	11,
	21,
	11,
	25,
	7,
	25,
	39,
	55,
	7,
	1,
	65,
	0,
	16,
	3,
	2,
	2,
	2,
	28,
	43,
	28,
	4,
	28,
	36,
	7,
	2,
	27,
	28,
	53,
	11,
	21,
	11,
	18,
	14,
	17,
	111,
	72,
	56,
	50,
	14,
	50,
	14,
	35,
	39,
	27,
	10,
	22,
	251,
	41,
	7,
	1,
	17,
	5,
	57,
	28,
	11,
	0,
	9,
	21,
	43,
	17,
	47,
	20,
	28,
	22,
	13,
	52,
	58,
	1,
	3,
	0,
	14,
	44,
	33,
	24,
	27,
	35,
	30,
	0,
	3,
	0,
	9,
	34,
	4,
	0,
	13,
	47,
	15,
	3,
	22,
	0,
	2,
	0,
	36,
	17,
	2,
	24,
	20,
	1,
	64,
	6,
	2,
	0,
	2,
	3,
	2,
	14,
	2,
	9,
	8,
	46,
	39,
	7,
	3,
	1,
	3,
	21,
	2,
	6,
	2,
	1,
	2,
	4,
	4,
	0,
	19,
	0,
	13,
	4,
	31,
	9,
	2,
	0,
	3,
	0,
	2,
	37,
	2,
	0,
	26,
	0,
	2,
	0,
	45,
	52,
	19,
	3,
	21,
	2,
	31,
	47,
	21,
	1,
	2,
	0,
	185,
	46,
	42,
	3,
	37,
	47,
	21,
	0,
	60,
	42,
	14,
	0,
	72,
	26,
	38,
	6,
	186,
	43,
	117,
	63,
	32,
	7,
	3,
	0,
	3,
	7,
	2,
	1,
	2,
	23,
	16,
	0,
	2,
	0,
	95,
	7,
	3,
	38,
	17,
	0,
	2,
	0,
	29,
	0,
	11,
	39,
	8,
	0,
	22,
	0,
	12,
	45,
	20,
	0,
	19,
	72,
	200,
	32,
	32,
	8,
	2,
	36,
	18,
	0,
	50,
	29,
	113,
	6,
	2,
	1,
	2,
	37,
	22,
	0,
	26,
	5,
	2,
	1,
	2,
	31,
	15,
	0,
	24,
	43,
	261,
	18,
	16,
	0,
	2,
	12,
	2,
	33,
	125,
	0,
	80,
	921,
	103,
	110,
	18,
	195,
	2637,
	96,
	16,
	1071,
	18,
	5,
	26,
	3994,
	6,
	582,
	6842,
	29,
	1763,
	568,
	8,
	30,
	18,
	78,
	18,
	29,
	19,
	47,
	17,
	3,
	32,
	20,
	6,
	18,
	433,
	44,
	212,
	63,
	33,
	24,
	3,
	24,
	45,
	74,
	6,
	0,
	67,
	12,
	65,
	1,
	2,
	0,
	15,
	4,
	10,
	7381,
	42,
	31,
	98,
	114,
	8702,
	3,
	2,
	6,
	2,
	1,
	2,
	290,
	16,
	0,
	30,
	2,
	3,
	0,
	15,
	3,
	9,
	395,
	2309,
	106,
	6,
	12,
	4,
	8,
	8,
	9,
	5991,
	84,
	2,
	70,
	2,
	1,
	3,
	0,
	3,
	1,
	3,
	3,
	2,
	11,
	2,
	0,
	2,
	6,
	2,
	64,
	2,
	3,
	3,
	7,
	2,
	6,
	2,
	27,
	2,
	3,
	2,
	4,
	2,
	0,
	4,
	6,
	2,
	339,
	3,
	24,
	2,
	24,
	2,
	30,
	2,
	24,
	2,
	30,
	2,
	24,
	2,
	30,
	2,
	24,
	2,
	30,
	2,
	24,
	2,
	7,
	1845,
	30,
	7,
	5,
	262,
	61,
	147,
	44,
	11,
	6,
	17,
	0,
	322,
	29,
	19,
	43,
	485,
	27,
	229,
	29,
	3,
	0,
	208,
	30,
	2,
	2,
	2,
	1,
	2,
	6,
	3,
	4,
	10,
	1,
	225,
	6,
	2,
	3,
	2,
	1,
	2,
	14,
	2,
	196,
	60,
	67,
	8,
	0,
	1205,
	3,
	2,
	26,
	2,
	1,
	2,
	0,
	3,
	0,
	2,
	9,
	2,
	3,
	2,
	0,
	2,
	0,
	7,
	0,
	5,
	0,
	2,
	0,
	2,
	0,
	2,
	2,
	2,
	1,
	2,
	0,
	3,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	0,
	2,
	1,
	2,
	0,
	3,
	3,
	2,
	6,
	2,
	3,
	2,
	3,
	2,
	0,
	2,
	9,
	2,
	16,
	6,
	2,
	2,
	4,
	2,
	16,
	4421,
	42719,
	33,
	4381,
	3,
	5773,
	3,
	7472,
	16,
	621,
	2467,
	541,
	1507,
	4938,
	6,
	8489
], h = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-᫝᫠-᫫ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", g = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-࢏ࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚ౜ౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ೜-ೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-Ƛ꟱-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", _ = {
	3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
	5: "class enum extends super const export import",
	6: "enum",
	strict: "implements interface let package private protected public static yield",
	strictBind: "eval arguments"
}, ee = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", v = {
	5: ee,
	"5module": ee + " export import",
	6: ee + " const class extends export import super"
}, y = /^in(stanceof)?$/, b = RegExp("[" + g + "]"), te = RegExp("[" + g + h + "]");
function ne(e, t) {
	for (var n = 65536, r = 0; r < t.length; r += 2) {
		if (n += t[r], n > e) return !1;
		if (n += t[r + 1], n >= e) return !0;
	}
	return !1;
}
function x(e, t) {
	return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && b.test(String.fromCharCode(e)) : t === !1 ? !1 : ne(e, m);
}
function re(e, t) {
	return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && te.test(String.fromCharCode(e)) : t === !1 ? !1 : ne(e, m) || ne(e, p);
}
var S = function(e, t) {
	t === void 0 && (t = {}), this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null;
};
function C(e, t) {
	return new S(e, {
		beforeExpr: !0,
		binop: t
	});
}
var w = { beforeExpr: !0 }, T = { startsExpr: !0 }, ie = {};
function E(e, t) {
	return t === void 0 && (t = {}), t.keyword = e, ie[e] = new S(e, t);
}
var D = {
	num: new S("num", T),
	regexp: new S("regexp", T),
	string: new S("string", T),
	name: new S("name", T),
	privateId: new S("privateId", T),
	eof: new S("eof"),
	bracketL: new S("[", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	bracketR: new S("]"),
	braceL: new S("{", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	braceR: new S("}"),
	parenL: new S("(", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	parenR: new S(")"),
	comma: new S(",", w),
	semi: new S(";", w),
	colon: new S(":", w),
	dot: new S("."),
	question: new S("?", w),
	questionDot: new S("?."),
	arrow: new S("=>", w),
	template: new S("template"),
	invalidTemplate: new S("invalidTemplate"),
	ellipsis: new S("...", w),
	backQuote: new S("`", T),
	dollarBraceL: new S("${", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	eq: new S("=", {
		beforeExpr: !0,
		isAssign: !0
	}),
	assign: new S("_=", {
		beforeExpr: !0,
		isAssign: !0
	}),
	incDec: new S("++/--", {
		prefix: !0,
		postfix: !0,
		startsExpr: !0
	}),
	prefix: new S("!/~", {
		beforeExpr: !0,
		prefix: !0,
		startsExpr: !0
	}),
	logicalOR: C("||", 1),
	logicalAND: C("&&", 2),
	bitwiseOR: C("|", 3),
	bitwiseXOR: C("^", 4),
	bitwiseAND: C("&", 5),
	equality: C("==/!=/===/!==", 6),
	relational: C("</>/<=/>=", 7),
	bitShift: C("<</>>/>>>", 8),
	plusMin: new S("+/-", {
		beforeExpr: !0,
		binop: 9,
		prefix: !0,
		startsExpr: !0
	}),
	modulo: C("%", 10),
	star: C("*", 10),
	slash: C("/", 10),
	starstar: new S("**", { beforeExpr: !0 }),
	coalesce: C("??", 1),
	_break: E("break"),
	_case: E("case", w),
	_catch: E("catch"),
	_continue: E("continue"),
	_debugger: E("debugger"),
	_default: E("default", w),
	_do: E("do", {
		isLoop: !0,
		beforeExpr: !0
	}),
	_else: E("else", w),
	_finally: E("finally"),
	_for: E("for", { isLoop: !0 }),
	_function: E("function", T),
	_if: E("if"),
	_return: E("return", w),
	_switch: E("switch"),
	_throw: E("throw", w),
	_try: E("try"),
	_var: E("var"),
	_const: E("const"),
	_while: E("while", { isLoop: !0 }),
	_with: E("with"),
	_new: E("new", {
		beforeExpr: !0,
		startsExpr: !0
	}),
	_this: E("this", T),
	_super: E("super", T),
	_class: E("class", T),
	_extends: E("extends", w),
	_export: E("export"),
	_import: E("import", T),
	_null: E("null", T),
	_true: E("true", T),
	_false: E("false", T),
	_in: E("in", {
		beforeExpr: !0,
		binop: 7
	}),
	_instanceof: E("instanceof", {
		beforeExpr: !0,
		binop: 7
	}),
	_typeof: E("typeof", {
		beforeExpr: !0,
		prefix: !0,
		startsExpr: !0
	}),
	_void: E("void", {
		beforeExpr: !0,
		prefix: !0,
		startsExpr: !0
	}),
	_delete: E("delete", {
		beforeExpr: !0,
		prefix: !0,
		startsExpr: !0
	})
}, O = /\r\n?|\n|\u2028|\u2029/, ae = new RegExp(O.source, "g");
function oe(e) {
	return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function se(e, t, n) {
	n === void 0 && (n = e.length);
	for (var r = t; r < n; r++) {
		var i = e.charCodeAt(r);
		if (oe(i)) return r < n - 1 && i === 13 && e.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
	}
	return -1;
}
var ce = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, k = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, le = Object.prototype, ue = le.hasOwnProperty, de = le.toString, fe = Object.hasOwn || (function(e, t) {
	return ue.call(e, t);
}), pe = Array.isArray || (function(e) {
	return de.call(e) === "[object Array]";
}), me = Object.create(null);
function A(e) {
	return me[e] || (me[e] = RegExp("^(?:" + e.replace(/ /g, "|") + ")$"));
}
function he(e) {
	return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
var ge = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, _e = function(e, t) {
	this.line = e, this.column = t;
};
_e.prototype.offset = function(e) {
	return new _e(this.line, this.column + e);
};
var ve = function(e, t, n) {
	this.start = t, this.end = n, e.sourceFile !== null && (this.source = e.sourceFile);
};
function ye(e, t) {
	for (var n = 1, r = 0;;) {
		var i = se(e, r, t);
		if (i < 0) return new _e(n, t - r);
		++n, r = i;
	}
}
var be = {
	ecmaVersion: null,
	sourceType: "script",
	strict: !1,
	onInsertedSemicolon: null,
	onTrailingComma: null,
	allowReserved: null,
	allowReturnOutsideFunction: !1,
	allowImportExportEverywhere: !1,
	allowAwaitOutsideFunction: null,
	allowSuperOutsideMethod: null,
	allowHashBang: !1,
	checkPrivateFields: !0,
	locations: !1,
	onToken: null,
	onComment: null,
	ranges: !1,
	program: null,
	sourceFile: null,
	directSourceFile: null,
	preserveParens: !1
}, xe = !1;
function Se(e) {
	var t = {};
	for (var n in be) t[n] = e && fe(e, n) ? e[n] : be[n];
	if (t.ecmaVersion === "latest" ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!xe && typeof console == "object" && console.warn && (xe = !0, console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved ??= t.ecmaVersion < 5, (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), pe(t.onToken)) {
		var r = t.onToken;
		t.onToken = function(e) {
			return r.push(e);
		};
	}
	if (pe(t.onComment) && (t.onComment = Ce(t, t.onComment)), t.sourceType === "commonjs" && t.allowAwaitOutsideFunction) throw Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");
	return t;
}
function Ce(e, t) {
	return function(n, r, i, a, o, s) {
		var c = {
			type: n ? "Block" : "Line",
			value: r,
			start: i,
			end: a
		};
		e.locations && (c.loc = new ve(this, o, s)), e.ranges && (c.range = [i, a]), t.push(c);
	};
}
var we = 1, Te = 2, Ee = 4, j = 8, De = 16, Oe = 32, ke = 64, M = 128, N = 256, P = 512, Ae = 1024, je = we | Te | N;
function F(e, t) {
	return Te | (e ? Ee : 0) | (t ? j : 0);
}
var Me = 0, Ne = 1, Pe = 2, Fe = 3, Ie = 4, Le = 5, I = function(e, t, n) {
	this.options = e = Se(e), this.sourceFile = e.sourceFile, this.keywords = A(v[e.ecmaVersion >= 6 ? 6 : e.sourceType === "module" ? "5module" : 5]);
	var r = "";
	e.allowReserved !== !0 && (r = _[e.ecmaVersion >= 6 ? 6 : e.ecmaVersion === 5 ? 5 : 3], e.sourceType === "module" && (r += " await")), this.reservedWords = A(r);
	var i = (r ? r + " " : "") + _.strict;
	this.reservedWordsStrict = A(i), this.reservedWordsStrictBind = A(i + " " + _.strictBind), this.input = String(t), this.containsEsc = !1, n ? (this.pos = n, this.lineStart = this.input.lastIndexOf("\n", n - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(O).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = D.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = e.sourceType === "module", this.strict = this.inModule || e.strict === !0 || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), this.pos === 0 && e.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(this.options.sourceType === "commonjs" ? Te : we), this.regexpState = null, this.privateNameStack = [];
}, L = {
	inFunction: { configurable: !0 },
	inGenerator: { configurable: !0 },
	inAsync: { configurable: !0 },
	canAwait: { configurable: !0 },
	allowReturn: { configurable: !0 },
	allowSuper: { configurable: !0 },
	allowDirectSuper: { configurable: !0 },
	treatFunctionsAsVar: { configurable: !0 },
	allowNewDotTarget: { configurable: !0 },
	allowUsing: { configurable: !0 },
	inClassStaticBlock: { configurable: !0 }
};
I.prototype.parse = function() {
	var e = this, t = this.options.program || this.startNode();
	return this.nextToken(), this.catchStackOverflow(function() {
		return e.parseTopLevel(t);
	});
}, L.inFunction.get = function() {
	return (this.currentVarScope().flags & Te) > 0;
}, L.inGenerator.get = function() {
	return (this.currentVarScope().flags & j) > 0;
}, L.inAsync.get = function() {
	return (this.currentVarScope().flags & Ee) > 0;
}, L.canAwait.get = function() {
	for (var e = this.scopeStack.length - 1; e >= 0; e--) {
		var t = this.scopeStack[e].flags;
		if (t & (N | P)) return !1;
		if (t & Te) return (t & Ee) > 0;
	}
	return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
}, L.allowReturn.get = function() {
	return !!(this.inFunction || this.options.allowReturnOutsideFunction && this.currentVarScope().flags & we);
}, L.allowSuper.get = function() {
	return (this.currentThisScope().flags & ke) > 0 || this.options.allowSuperOutsideMethod;
}, L.allowDirectSuper.get = function() {
	return (this.currentThisScope().flags & M) > 0;
}, L.treatFunctionsAsVar.get = function() {
	return this.treatFunctionsAsVarInScope(this.currentScope());
}, L.allowNewDotTarget.get = function() {
	for (var e = this.scopeStack.length - 1; e >= 0; e--) {
		var t = this.scopeStack[e].flags;
		if (t & (N | P) || t & Te && !(t & De)) return !0;
	}
	return !1;
}, L.allowUsing.get = function() {
	var e = this.currentScope().flags;
	return !(e & Ae || !this.inModule && e & we);
}, L.inClassStaticBlock.get = function() {
	return (this.currentVarScope().flags & N) > 0;
}, I.extend = function() {
	for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
	for (var n = this, r = 0; r < e.length; r++) n = e[r](n);
	return n;
}, I.parse = function(e, t) {
	return new this(t, e).parse();
}, I.parseExpressionAt = function(e, t, n) {
	var r = new this(n, e, t);
	return r.nextToken(), r.parseExpression();
}, I.tokenizer = function(e, t) {
	return new this(t, e);
}, Object.defineProperties(I.prototype, L);
var R = I.prototype, z = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
R.strictDirective = function(e) {
	if (this.options.ecmaVersion < 5) return !1;
	for (;;) {
		k.lastIndex = e, e += k.exec(this.input)[0].length;
		var t = z.exec(this.input.slice(e));
		if (!t) return !1;
		if ((t[1] || t[2]) === "use strict") {
			k.lastIndex = e + t[0].length;
			var n = k.exec(this.input), r = n.index + n[0].length, i = this.input.charAt(r);
			return i === ";" || i === "}" || O.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(i) || i === "!" && this.input.charAt(r + 1) === "=");
		}
		e += t[0].length, k.lastIndex = e, e += k.exec(this.input)[0].length, this.input[e] === ";" && e++;
	}
}, R.eat = function(e) {
	return this.type === e ? (this.next(), !0) : !1;
}, R.isContextual = function(e) {
	return this.type === D.name && this.value === e && !this.containsEsc;
}, R.eatContextual = function(e) {
	return this.isContextual(e) ? (this.next(), !0) : !1;
}, R.catchStackOverflow = function(e) {
	try {
		return e();
	} catch (e) {
		if (e instanceof Error && (/\bstack\b.*\b(exceeded|overflow)\b/i.test(e.message) || /\btoo much recursion\b/i.test(e.message))) this.raise(this.start, "Not enough stack space to parse input");
		else throw e;
	}
}, R.expectContextual = function(e) {
	this.eatContextual(e) || this.unexpected();
}, R.canInsertSemicolon = function() {
	return this.type === D.eof || this.type === D.braceR || O.test(this.input.slice(this.lastTokEnd, this.start));
}, R.insertSemicolon = function() {
	if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
}, R.semicolon = function() {
	!this.eat(D.semi) && !this.insertSemicolon() && this.unexpected();
}, R.afterTrailingComma = function(e, t) {
	if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
}, R.expect = function(e) {
	this.eat(e) || this.unexpected();
}, R.unexpected = function(e) {
	this.raise(e ?? this.start, "Unexpected token");
};
var B = function() {
	this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
R.checkPatternErrors = function(e, t) {
	if (e) {
		e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
		var n = t ? e.parenthesizedAssign : e.parenthesizedBind;
		n > -1 && this.raiseRecoverable(n, t ? "Assigning to rvalue" : "Parenthesized pattern");
	}
}, R.checkExpressionErrors = function(e, t) {
	if (!e) return !1;
	var n = e.shorthandAssign, r = e.doubleProto;
	if (!t) return n >= 0 || r >= 0;
	n >= 0 && this.raise(n, "Shorthand property assignments are valid only in destructuring patterns"), r >= 0 && this.raiseRecoverable(r, "Redefinition of __proto__ property");
}, R.checkYieldAwaitInDefaultParams = function() {
	this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
}, R.isSimpleAssignTarget = function(e) {
	return e.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(e.expression) : e.type === "Identifier" || e.type === "MemberExpression";
};
var V = I.prototype;
V.parseTopLevel = function(e) {
	var t = Object.create(null);
	for (e.body ||= []; this.type !== D.eof;) {
		var n = this.parseStatement(null, !0, t);
		e.body.push(n);
	}
	if (this.inModule) for (var r = 0, i = Object.keys(this.undefinedExports); r < i.length; r += 1) {
		var a = i[r];
		this.raiseRecoverable(this.undefinedExports[a].start, "Export '" + a + "' is not defined");
	}
	return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType === "commonjs" ? "script" : this.options.sourceType, this.finishNode(e, "Program");
};
var H = { kind: "loop" }, Re = { kind: "switch" };
V.isLet = function(e) {
	if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
	k.lastIndex = this.pos;
	var t = k.exec(this.input), n = this.pos + t[0].length, r = this.fullCharCodeAt(n);
	if (r === 91 || r === 92) return !0;
	if (e) return !1;
	if (r === 123) return !0;
	if (x(r)) {
		var i = n;
		do
			n += r <= 65535 ? 1 : 2;
		while (re(r = this.fullCharCodeAt(n)));
		if (r === 92) return !0;
		var a = this.input.slice(i, n);
		if (!y.test(a)) return !0;
	}
	return !1;
}, V.isAsyncFunction = function() {
	if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
	k.lastIndex = this.pos;
	var e = k.exec(this.input), t = this.pos + e[0].length, n;
	return !O.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !(re(n = this.fullCharCodeAt(t + 8)) || n === 92));
}, V.isUsingKeyword = function(e, t) {
	if (this.options.ecmaVersion < 17 || !this.isContextual(e ? "await" : "using")) return !1;
	k.lastIndex = this.pos;
	var n = k.exec(this.input), r = this.pos + n[0].length;
	if (O.test(this.input.slice(this.pos, r))) return !1;
	if (e) {
		var i = r + 5, a;
		if (this.input.slice(r, i) !== "using" || i === this.input.length || re(a = this.fullCharCodeAt(i)) || a === 92) return !1;
		k.lastIndex = i;
		var o = k.exec(this.input);
		if (r = i + o[0].length, o && O.test(this.input.slice(i, r))) return !1;
	}
	var s = this.fullCharCodeAt(r);
	if (!x(s) && s !== 92) return !1;
	var c = r;
	do
		r += s <= 65535 ? 1 : 2;
	while (re(s = this.fullCharCodeAt(r)));
	if (s === 92) return !0;
	var l = this.input.slice(c, r);
	if (y.test(l)) return !1;
	if (t && !e && l === "of") {
		k.lastIndex = r;
		var u = k.exec(this.input);
		if (r += u[0].length, this.input.charCodeAt(r) !== 61 || (s = this.input.charCodeAt(r + 1)) === 61 || s === 62) return !1;
	}
	return !0;
}, V.isAwaitUsing = function(e) {
	return this.isUsingKeyword(!0, e);
}, V.isUsing = function(e) {
	return this.isUsingKeyword(!1, e);
}, V.parseStatement = function(e, t, n) {
	var r = this.type, i = this.startNode(), a;
	switch (this.isLet(e) && (r = D._var, a = "let"), r) {
		case D._break:
		case D._continue: return this.parseBreakContinueStatement(i, r.keyword);
		case D._debugger: return this.parseDebuggerStatement(i);
		case D._do: return this.parseDoStatement(i);
		case D._for: return this.parseForStatement(i);
		case D._function: return e && (this.strict || e !== "if" && e !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(i, !1, !e);
		case D._class: return e && this.unexpected(), this.parseClass(i, !0);
		case D._if: return this.parseIfStatement(i);
		case D._return: return this.parseReturnStatement(i);
		case D._switch: return this.parseSwitchStatement(i);
		case D._throw: return this.parseThrowStatement(i);
		case D._try: return this.parseTryStatement(i);
		case D._const:
		case D._var: return a ||= this.value, e && a !== "var" && this.unexpected(), this.parseVarStatement(i, a);
		case D._while: return this.parseWhileStatement(i);
		case D._with: return this.parseWithStatement(i);
		case D.braceL: return this.parseBlock(!0, i);
		case D.semi: return this.parseEmptyStatement(i);
		case D._export:
		case D._import:
			if (this.options.ecmaVersion > 10 && r === D._import) {
				k.lastIndex = this.pos;
				var o = k.exec(this.input), s = this.pos + o[0].length, c = this.input.charCodeAt(s);
				if (c === 40 || c === 46) return this.parseExpressionStatement(i, this.parseExpression());
			}
			return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), r === D._import ? this.parseImport(i) : this.parseExport(i, n);
		default:
			if (this.isAsyncFunction()) return e && this.unexpected(), this.next(), this.parseFunctionStatement(i, !0, !e);
			var l = this.isAwaitUsing(!1) ? "await using" : this.isUsing(!1) ? "using" : null;
			if (l) return this.allowUsing || this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"), e && this.raise(this.start, "Using declaration is not allowed in single-statement positions"), l === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.next(), this.parseVar(i, !1, l), this.semicolon(), this.finishNode(i, "VariableDeclaration");
			var u = this.value, d = this.parseExpression();
			return r === D.name && d.type === "Identifier" && this.eat(D.colon) ? this.parseLabeledStatement(i, u, d, e) : this.parseExpressionStatement(i, d);
	}
}, V.parseBreakContinueStatement = function(e, t) {
	var n = t === "break";
	this.next(), this.eat(D.semi) || this.insertSemicolon() ? e.label = null : this.type === D.name ? (e.label = this.parseIdent(), this.semicolon()) : this.unexpected();
	for (var r = 0; r < this.labels.length; ++r) {
		var i = this.labels[r];
		if ((e.label == null || i.name === e.label.name) && (i.kind != null && (n || i.kind === "loop") || e.label && n)) break;
	}
	return r === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, n ? "BreakStatement" : "ContinueStatement");
}, V.parseDebuggerStatement = function(e) {
	return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
}, V.parseDoStatement = function(e) {
	return this.next(), this.labels.push(H), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(D._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(D.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
}, V.parseForStatement = function(e) {
	this.next();
	var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
	if (this.labels.push(H), this.enterScope(0), this.expect(D.parenL), this.type === D.semi) return t > -1 && this.unexpected(t), this.parseFor(e, null);
	var n = this.isLet();
	if (this.type === D._var || this.type === D._const || n) {
		var r = this.startNode(), i = n ? "let" : this.value;
		return this.next(), this.parseVar(r, !0, i), this.finishNode(r, "VariableDeclaration"), this.parseForAfterInit(e, r, t);
	}
	var a = this.isContextual("let"), o = !1, s = this.isUsing(!0) ? "using" : this.isAwaitUsing(!0) ? "await using" : null;
	if (s) {
		var c = this.startNode();
		return this.next(), s === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.parseVar(c, !0, s), this.finishNode(c, "VariableDeclaration"), this.parseForAfterInit(e, c, t);
	}
	var l = this.containsEsc, u = new B(), d = this.start, f = t > -1 ? this.parseExprSubscripts(u, "await") : this.parseExpression(!0, u);
	return this.type === D._in || (o = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (t > -1 ? (this.type === D._in && this.unexpected(t), e.await = !0) : o && this.options.ecmaVersion >= 8 && (f.start === d && !l && f.type === "Identifier" && f.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), a && o && this.raise(f.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(f, !1, u), this.checkLValPattern(f), this.parseForIn(e, f)) : (this.checkExpressionErrors(u, !0), t > -1 && this.unexpected(t), this.parseFor(e, f));
}, V.parseForAfterInit = function(e, t, n) {
	return (this.type === D._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && t.declarations.length === 1 ? (this.type === D._in ? ((t.kind === "using" || t.kind === "await using") && !t.declarations[0].init && this.raise(this.start, "Using declaration is not allowed in for-in loops"), this.options.ecmaVersion >= 9 && n > -1 && this.unexpected(n)) : this.options.ecmaVersion >= 9 && (e.await = n > -1), this.parseForIn(e, t)) : (n > -1 && this.unexpected(n), this.parseFor(e, t));
}, V.parseFunctionStatement = function(e, t, n) {
	return this.next(), this.parseFunction(e, Be | (n ? 0 : Ve), !1, t);
}, V.parseIfStatement = function(e) {
	return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(D._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
}, V.parseReturnStatement = function(e) {
	return this.allowReturn || this.raise(this.start, "'return' outside of function"), this.next(), this.eat(D.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
}, V.parseSwitchStatement = function(e) {
	this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(D.braceL), this.labels.push(Re), this.enterScope(Ae);
	for (var t, n = !1; this.type !== D.braceR;) if (this.type === D._case || this.type === D._default) {
		var r = this.type === D._case;
		t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), r ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), n = !0, t.test = null), this.expect(D.colon);
	} else t || this.unexpected(), t.consequent.push(this.parseStatement(null));
	return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
}, V.parseThrowStatement = function(e) {
	return this.next(), O.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
};
var ze = [];
V.parseCatchClauseParam = function() {
	var e = this.parseBindingAtom(), t = e.type === "Identifier";
	return this.enterScope(t ? Oe : 0), this.checkLValPattern(e, t ? Ie : Pe), this.expect(D.parenR), e;
}, V.parseTryStatement = function(e) {
	if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === D._catch) {
		var t = this.startNode();
		this.next(), this.eat(D.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
	}
	return e.finalizer = this.eat(D._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
}, V.parseVarStatement = function(e, t, n) {
	return this.next(), this.parseVar(e, !1, t, n), this.semicolon(), this.finishNode(e, "VariableDeclaration");
}, V.parseWhileStatement = function(e) {
	return this.next(), e.test = this.parseParenExpression(), this.labels.push(H), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
}, V.parseWithStatement = function(e) {
	return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
}, V.parseEmptyStatement = function(e) {
	return this.next(), this.finishNode(e, "EmptyStatement");
}, V.parseLabeledStatement = function(e, t, n, r) {
	for (var i = 0, a = this.labels; i < a.length; i += 1) a[i].name === t && this.raise(n.start, "Label '" + t + "' is already declared");
	for (var o = this.type.isLoop ? "loop" : this.type === D._switch ? "switch" : null, s = this.labels.length - 1; s >= 0; s--) {
		var c = this.labels[s];
		if (c.statementStart === e.start) c.statementStart = this.start, c.kind = o;
		else break;
	}
	return this.labels.push({
		name: t,
		kind: o,
		statementStart: this.start
	}), e.body = this.parseStatement(r ? r.indexOf("label") === -1 ? r + "label" : r : "label"), this.labels.pop(), e.label = n, this.finishNode(e, "LabeledStatement");
}, V.parseExpressionStatement = function(e, t) {
	return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
}, V.parseBlock = function(e, t, n) {
	for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(D.braceL), e && this.enterScope(0); this.type !== D.braceR;) {
		var r = this.parseStatement(null);
		t.body.push(r);
	}
	return n && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
}, V.parseFor = function(e, t) {
	return e.init = t, this.expect(D.semi), e.test = this.type === D.semi ? null : this.parseExpression(), this.expect(D.semi), e.update = this.type === D.parenR ? null : this.parseExpression(), this.expect(D.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
}, V.parseForIn = function(e, t) {
	var n = this.type === D._in;
	return this.next(), t.type === "VariableDeclaration" && t.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || t.kind !== "var" || t.declarations[0].id.type !== "Identifier") && this.raise(t.start, (n ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"), e.left = t, e.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(D.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, n ? "ForInStatement" : "ForOfStatement");
}, V.parseVar = function(e, t, n, r) {
	for (e.declarations = [], e.kind = n;;) {
		var i = this.startNode();
		if (this.parseVarId(i, n), this.eat(D.eq) ? i.init = this.parseMaybeAssign(t) : !r && n === "const" && !(this.type === D._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !r && (n === "using" || n === "await using") && this.options.ecmaVersion >= 17 && this.type !== D._in && !this.isContextual("of") ? this.raise(this.lastTokEnd, "Missing initializer in " + n + " declaration") : !r && i.id.type !== "Identifier" && !(t && (this.type === D._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : i.init = null, e.declarations.push(this.finishNode(i, "VariableDeclarator")), !this.eat(D.comma)) break;
	}
	return e;
}, V.parseVarId = function(e, t) {
	e.id = t === "using" || t === "await using" ? this.parseIdent() : this.parseBindingAtom(), this.checkLValPattern(e.id, t === "var" ? Ne : Pe, !1);
};
var Be = 1, Ve = 2, He = 4;
V.parseFunction = function(e, t, n, r, i) {
	this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !r) && (this.type === D.star && t & Ve && this.unexpected(), e.generator = this.eat(D.star)), this.options.ecmaVersion >= 8 && (e.async = !!r), t & Be && (e.id = t & He && this.type !== D.name ? null : this.parseIdent(), e.id && !(t & Ve) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? Ne : Pe : Fe));
	var a = this.yieldPos, o = this.awaitPos, s = this.awaitIdentPos;
	return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(F(e.async, e.generator)), t & Be || (e.id = this.type === D.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, n, !1, i), this.yieldPos = a, this.awaitPos = o, this.awaitIdentPos = s, this.finishNode(e, t & Be ? "FunctionDeclaration" : "FunctionExpression");
}, V.parseFunctionParams = function(e) {
	this.expect(D.parenL), e.params = this.parseBindingList(D.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
}, V.parseClass = function(e, t) {
	this.next();
	var n = this.strict;
	this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
	var r = this.enterClassBody(), i = this.startNode(), a = !1;
	for (i.body = [], this.expect(D.braceL); this.type !== D.braceR;) {
		var o = this.parseClassElement(e.superClass !== null);
		o && (i.body.push(o), o.type === "MethodDefinition" && o.kind === "constructor" ? (a && this.raiseRecoverable(o.start, "Duplicate constructor in the same class"), a = !0) : o.key && o.key.type === "PrivateIdentifier" && Ue(r, o) && this.raiseRecoverable(o.key.start, "Identifier '#" + o.key.name + "' has already been declared"));
	}
	return this.strict = n, this.next(), e.body = this.finishNode(i, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
}, V.parseClassElement = function(e) {
	if (this.eat(D.semi)) return null;
	var t = this.options.ecmaVersion, n = this.startNode(), r = "", i = !1, a = !1, o = "method", s = !1;
	if (this.eatContextual("static")) {
		if (t >= 13 && this.eat(D.braceL)) return this.parseClassStaticBlock(n), n;
		this.isClassElementNameStart() || this.type === D.star ? s = !0 : r = "static";
	}
	if (n.static = s, !r && t >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === D.star) && !this.canInsertSemicolon() ? a = !0 : r = "async"), !r && (t >= 9 || !a) && this.eat(D.star) && (i = !0), !r && !a && !i) {
		var c = this.value;
		(this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? o = c : r = c);
	}
	if (r ? (n.computed = !1, n.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), n.key.name = r, this.finishNode(n.key, "Identifier")) : this.parseClassElementName(n), t < 13 || this.type === D.parenL || o !== "method" || i || a) {
		var l = !n.static && We(n, "constructor"), u = l && e;
		l && o !== "method" && this.raise(n.key.start, "Constructor can't have get/set modifier"), n.kind = l ? "constructor" : o, this.parseClassMethod(n, i, a, u);
	} else this.parseClassField(n);
	return n;
}, V.isClassElementNameStart = function() {
	return this.type === D.name || this.type === D.privateId || this.type === D.num || this.type === D.string || this.type === D.bracketL || this.type.keyword;
}, V.parseClassElementName = function(e) {
	this.type === D.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
}, V.parseClassMethod = function(e, t, n, r) {
	var i = e.key;
	e.kind === "constructor" ? (t && this.raise(i.start, "Constructor can't be a generator"), n && this.raise(i.start, "Constructor can't be an async method")) : e.static && We(e, "prototype") && this.raise(i.start, "Classes may not have a static property named prototype");
	var a = e.value = this.parseMethod(t, n, r);
	return e.kind === "get" && a.params.length !== 0 && this.raiseRecoverable(a.start, "getter should have no params"), e.kind === "set" && a.params.length !== 1 && this.raiseRecoverable(a.start, "setter should have exactly one param"), e.kind === "set" && a.params[0].type === "RestElement" && this.raiseRecoverable(a.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
}, V.parseClassField = function(e) {
	return We(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && We(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(D.eq) ? (this.enterScope(P | ke), e.value = this.parseMaybeAssign(), this.exitScope()) : e.value = null, this.semicolon(), this.finishNode(e, "PropertyDefinition");
}, V.parseClassStaticBlock = function(e) {
	e.body = [];
	var t = this.labels;
	for (this.labels = [], this.enterScope(N | ke); this.type !== D.braceR;) {
		var n = this.parseStatement(null);
		e.body.push(n);
	}
	return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
}, V.parseClassId = function(e, t) {
	this.type === D.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, Pe, !1)) : (t === !0 && this.unexpected(), e.id = null);
}, V.parseClassSuper = function(e) {
	e.superClass = this.eat(D._extends) ? this.parseExprSubscripts(null, !1) : null;
}, V.enterClassBody = function() {
	var e = {
		declared: Object.create(null),
		used: []
	};
	return this.privateNameStack.push(e), e.declared;
}, V.exitClassBody = function() {
	var e = this.privateNameStack.pop(), t = e.declared, n = e.used;
	if (this.options.checkPrivateFields) for (var r = this.privateNameStack.length, i = r === 0 ? null : this.privateNameStack[r - 1], a = 0; a < n.length; ++a) {
		var o = n[a];
		fe(t, o.name) || (i ? i.used.push(o) : this.raiseRecoverable(o.start, "Private field '#" + o.name + "' must be declared in an enclosing class"));
	}
};
function Ue(e, t) {
	var n = t.key.name, r = e[n], i = "true";
	return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (i = (t.static ? "s" : "i") + t.kind), r === "iget" && i === "iset" || r === "iset" && i === "iget" || r === "sget" && i === "sset" || r === "sset" && i === "sget" ? (e[n] = "true", !1) : r ? !0 : (e[n] = i, !1);
}
function We(e, t) {
	var n = e.computed, r = e.key;
	return !n && (r.type === "Identifier" && r.name === t || r.type === "Literal" && r.value === t);
}
V.parseExportAllDeclaration = function(e, t) {
	return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== D.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
}, V.parseExport = function(e, t) {
	if (this.next(), this.eat(D.star)) return this.parseExportAllDeclaration(e, t);
	if (this.eat(D._default)) return this.checkExport(t, "default", this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, "ExportDefaultDeclaration");
	if (this.shouldParseExportStatement()) e.declaration = this.parseExportDeclaration(e), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
	else {
		if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from")) this.type !== D.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
		else {
			for (var n = 0, r = e.specifiers; n < r.length; n += 1) {
				var i = r[n];
				this.checkUnreserved(i.local), this.checkLocalExport(i.local), i.local.type === "Literal" && this.raise(i.local.start, "A string literal cannot be used as an exported binding without `from`.");
			}
			e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
		}
		this.semicolon();
	}
	return this.finishNode(e, "ExportNamedDeclaration");
}, V.parseExportDeclaration = function(e) {
	return this.parseStatement(null);
}, V.parseExportDefaultDeclaration = function() {
	var e;
	if (this.type === D._function || (e = this.isAsyncFunction())) {
		var t = this.startNode();
		return this.next(), e && this.next(), this.parseFunction(t, Be | He, !1, e);
	} else if (this.type === D._class) {
		var n = this.startNode();
		return this.parseClass(n, "nullableID");
	} else {
		var r = this.parseMaybeAssign();
		return this.semicolon(), r;
	}
}, V.checkExport = function(e, t, n) {
	e && (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), fe(e, t) && this.raiseRecoverable(n, "Duplicate export '" + t + "'"), e[t] = !0);
}, V.checkPatternExport = function(e, t) {
	var n = t.type;
	if (n === "Identifier") this.checkExport(e, t, t.start);
	else if (n === "ObjectPattern") for (var r = 0, i = t.properties; r < i.length; r += 1) {
		var a = i[r];
		this.checkPatternExport(e, a);
	}
	else if (n === "ArrayPattern") for (var o = 0, s = t.elements; o < s.length; o += 1) {
		var c = s[o];
		c && this.checkPatternExport(e, c);
	}
	else n === "Property" ? this.checkPatternExport(e, t.value) : n === "AssignmentPattern" ? this.checkPatternExport(e, t.left) : n === "RestElement" && this.checkPatternExport(e, t.argument);
}, V.checkVariableExport = function(e, t) {
	if (e) for (var n = 0, r = t; n < r.length; n += 1) {
		var i = r[n];
		this.checkPatternExport(e, i.id);
	}
}, V.shouldParseExportStatement = function() {
	return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
}, V.parseExportSpecifier = function(e) {
	var t = this.startNode();
	return t.local = this.parseModuleExportName(), t.exported = this.eatContextual("as") ? this.parseModuleExportName() : t.local, this.checkExport(e, t.exported, t.exported.start), this.finishNode(t, "ExportSpecifier");
}, V.parseExportSpecifiers = function(e) {
	var t = [], n = !0;
	for (this.expect(D.braceL); !this.eat(D.braceR);) {
		if (n) n = !1;
		else if (this.expect(D.comma), this.afterTrailingComma(D.braceR)) break;
		t.push(this.parseExportSpecifier(e));
	}
	return t;
}, V.parseImport = function(e) {
	return this.next(), this.type === D.string ? (e.specifiers = ze, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === D.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
}, V.parseImportSpecifier = function() {
	var e = this.startNode();
	return e.imported = this.parseModuleExportName(), this.eatContextual("as") ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, Pe), this.finishNode(e, "ImportSpecifier");
}, V.parseImportDefaultSpecifier = function() {
	var e = this.startNode();
	return e.local = this.parseIdent(), this.checkLValSimple(e.local, Pe), this.finishNode(e, "ImportDefaultSpecifier");
}, V.parseImportNamespaceSpecifier = function() {
	var e = this.startNode();
	return this.next(), this.expectContextual("as"), e.local = this.parseIdent(), this.checkLValSimple(e.local, Pe), this.finishNode(e, "ImportNamespaceSpecifier");
}, V.parseImportSpecifiers = function() {
	var e = [], t = !0;
	if (this.type === D.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(D.comma))) return e;
	if (this.type === D.star) return e.push(this.parseImportNamespaceSpecifier()), e;
	for (this.expect(D.braceL); !this.eat(D.braceR);) {
		if (t) t = !1;
		else if (this.expect(D.comma), this.afterTrailingComma(D.braceR)) break;
		e.push(this.parseImportSpecifier());
	}
	return e;
}, V.parseWithClause = function() {
	var e = [];
	if (!this.eat(D._with)) return e;
	this.expect(D.braceL);
	for (var t = {}, n = !0; !this.eat(D.braceR);) {
		if (n) n = !1;
		else if (this.expect(D.comma), this.afterTrailingComma(D.braceR)) break;
		var r = this.parseImportAttribute(), i = r.key.type === "Identifier" ? r.key.name : r.key.value;
		fe(t, i) && this.raiseRecoverable(r.key.start, "Duplicate attribute key '" + i + "'"), t[i] = !0, e.push(r);
	}
	return e;
}, V.parseImportAttribute = function() {
	var e = this.startNode();
	return e.key = this.type === D.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(D.colon), this.type !== D.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, "ImportAttribute");
}, V.parseModuleExportName = function() {
	if (this.options.ecmaVersion >= 13 && this.type === D.string) {
		var e = this.parseLiteral(this.value);
		return ge.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
	}
	return this.parseIdent(!0);
}, V.adaptDirectivePrologue = function(e) {
	for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) e[t].directive = e[t].expression.raw.slice(1, -1);
}, V.isDirectiveCandidate = function(e) {
	return this.options.ecmaVersion >= 5 && e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && (this.input[e.start] === "\"" || this.input[e.start] === "'");
};
var U = I.prototype;
U.toAssignable = function(e, t, n) {
	if (this.options.ecmaVersion >= 6 && e) switch (e.type) {
		case "Identifier":
			this.inAsync && e.name === "await" && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
			break;
		case "ObjectPattern":
		case "ArrayPattern":
		case "AssignmentPattern":
		case "RestElement": break;
		case "ObjectExpression":
			e.type = "ObjectPattern", n && this.checkPatternErrors(n, !0);
			for (var r = 0, i = e.properties; r < i.length; r += 1) {
				var a = i[r];
				this.toAssignable(a, t), a.type === "RestElement" && (a.argument.type === "ArrayPattern" || a.argument.type === "ObjectPattern") && this.raise(a.argument.start, "Unexpected token");
			}
			break;
		case "Property":
			e.kind !== "init" && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
			break;
		case "ArrayExpression":
			e.type = "ArrayPattern", n && this.checkPatternErrors(n, !0), this.toAssignableList(e.elements, t);
			break;
		case "SpreadElement":
			e.type = "RestElement", this.toAssignable(e.argument, t), e.argument.type === "AssignmentPattern" && this.raise(e.argument.start, "Rest elements cannot have a default value");
			break;
		case "AssignmentExpression":
			e.operator !== "=" && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
			break;
		case "ParenthesizedExpression":
			this.toAssignable(e.expression, t, n);
			break;
		case "ChainExpression":
			this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
			break;
		case "MemberExpression": if (!t) break;
		default: this.raise(e.start, "Assigning to rvalue");
	}
	else n && this.checkPatternErrors(n, !0);
	return e;
}, U.toAssignableList = function(e, t) {
	for (var n = e.length, r = 0; r < n; r++) {
		var i = e[r];
		i && this.toAssignable(i, t);
	}
	if (n) {
		var a = e[n - 1];
		this.options.ecmaVersion === 6 && t && a && a.type === "RestElement" && a.argument.type !== "Identifier" && this.unexpected(a.argument.start);
	}
	return e;
}, U.parseSpread = function(e) {
	var t = this.startNode();
	return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");
}, U.parseRestBinding = function() {
	var e = this.startNode();
	return this.next(), this.options.ecmaVersion === 6 && this.type !== D.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
}, U.parseBindingAtom = function() {
	if (this.options.ecmaVersion >= 6) switch (this.type) {
		case D.bracketL:
			var e = this.startNode();
			return this.next(), e.elements = this.parseBindingList(D.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
		case D.braceL: return this.parseObj(!0);
	}
	return this.parseIdent();
}, U.parseBindingList = function(e, t, n, r) {
	for (var i = [], a = !0; !this.eat(e);) if (a ? a = !1 : this.expect(D.comma), t && this.type === D.comma) i.push(null);
	else if (n && this.afterTrailingComma(e)) break;
	else if (this.type === D.ellipsis) {
		var o = this.parseRestBinding();
		this.parseBindingListItem(o), i.push(o), this.type === D.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(e);
		break;
	} else i.push(this.parseAssignableListItem(r));
	return i;
}, U.parseAssignableListItem = function(e) {
	var t = this.parseMaybeDefault(this.start, this.startLoc);
	return this.parseBindingListItem(t), t;
}, U.parseBindingListItem = function(e) {
	return e;
}, U.parseMaybeDefault = function(e, t, n) {
	if (n ||= this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(D.eq)) return n;
	var r = this.startNodeAt(e, t);
	return r.left = n, r.right = this.parseMaybeAssign(), this.finishNode(r, "AssignmentPattern");
}, U.checkLValSimple = function(e, t, n) {
	t === void 0 && (t = Me);
	var r = t !== Me;
	switch (e.type) {
		case "Identifier":
			this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (r ? "Binding " : "Assigning to ") + e.name + " in strict mode"), r && (t === Pe && e.name === "let" && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), n && (fe(n, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), n[e.name] = !0), t !== Le && this.declareName(e.name, t, e.start));
			break;
		case "ChainExpression":
			this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
			break;
		case "MemberExpression":
			r && this.raiseRecoverable(e.start, "Binding member expression");
			break;
		case "ParenthesizedExpression": return r && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, n);
		default: this.raise(e.start, (r ? "Binding" : "Assigning to") + " rvalue");
	}
}, U.checkLValPattern = function(e, t, n) {
	switch (t === void 0 && (t = Me), e.type) {
		case "ObjectPattern":
			for (var r = 0, i = e.properties; r < i.length; r += 1) {
				var a = i[r];
				this.checkLValInnerPattern(a, t, n);
			}
			break;
		case "ArrayPattern":
			for (var o = 0, s = e.elements; o < s.length; o += 1) {
				var c = s[o];
				c && this.checkLValInnerPattern(c, t, n);
			}
			break;
		default: this.checkLValSimple(e, t, n);
	}
}, U.checkLValInnerPattern = function(e, t, n) {
	switch (t === void 0 && (t = Me), e.type) {
		case "Property":
			this.checkLValInnerPattern(e.value, t, n);
			break;
		case "AssignmentPattern":
			this.checkLValPattern(e.left, t, n);
			break;
		case "RestElement":
			this.checkLValPattern(e.argument, t, n);
			break;
		default: this.checkLValPattern(e, t, n);
	}
};
var W = function(e, t, n, r, i) {
	this.token = e, this.isExpr = !!t, this.preserveSpace = !!n, this.override = r, this.generator = !!i;
}, G = {
	b_stat: new W("{", !1),
	b_expr: new W("{", !0),
	b_tmpl: new W("${", !1),
	p_stat: new W("(", !1),
	p_expr: new W("(", !0),
	q_tmpl: new W("`", !0, !0, function(e) {
		return e.tryReadTemplateToken();
	}),
	f_stat: new W("function", !1),
	f_expr: new W("function", !0),
	f_expr_gen: new W("function", !0, !1, null, !0),
	f_gen: new W("function", !1, !1, null, !0)
}, Ge = I.prototype;
Ge.initialContext = function() {
	return [G.b_stat];
}, Ge.curContext = function() {
	return this.context[this.context.length - 1];
}, Ge.braceIsBlock = function(e) {
	var t = this.curContext();
	return t === G.f_expr || t === G.f_stat ? !0 : e === D.colon && (t === G.b_stat || t === G.b_expr) ? !t.isExpr : e === D._return || e === D.name && this.exprAllowed ? O.test(this.input.slice(this.lastTokEnd, this.start)) : e === D._else || e === D.semi || e === D.eof || e === D.parenR || e === D.arrow ? !0 : e === D.braceL ? t === G.b_stat : e === D._var || e === D._const || e === D.name ? !1 : !this.exprAllowed;
}, Ge.inGeneratorContext = function() {
	for (var e = this.context.length - 1; e >= 1; e--) {
		var t = this.context[e];
		if (t.token === "function") return t.generator;
	}
	return !1;
}, Ge.updateContext = function(e) {
	var t, n = this.type;
	n.keyword && e === D.dot ? this.exprAllowed = !1 : (t = n.updateContext) ? t.call(this, e) : this.exprAllowed = n.beforeExpr;
}, Ge.overrideContext = function(e) {
	this.curContext() !== e && (this.context[this.context.length - 1] = e);
}, D.parenR.updateContext = D.braceR.updateContext = function() {
	if (this.context.length === 1) {
		this.exprAllowed = !0;
		return;
	}
	var e = this.context.pop();
	e === G.b_stat && this.curContext().token === "function" && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
}, D.braceL.updateContext = function(e) {
	this.context.push(this.braceIsBlock(e) ? G.b_stat : G.b_expr), this.exprAllowed = !0;
}, D.dollarBraceL.updateContext = function() {
	this.context.push(G.b_tmpl), this.exprAllowed = !0;
}, D.parenL.updateContext = function(e) {
	var t = e === D._if || e === D._for || e === D._with || e === D._while;
	this.context.push(t ? G.p_stat : G.p_expr), this.exprAllowed = !0;
}, D.incDec.updateContext = function() {}, D._function.updateContext = D._class.updateContext = function(e) {
	e.beforeExpr && e !== D._else && !(e === D.semi && this.curContext() !== G.p_stat) && !(e === D._return && O.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === D.colon || e === D.braceL) && this.curContext() === G.b_stat) ? this.context.push(G.f_expr) : this.context.push(G.f_stat), this.exprAllowed = !1;
}, D.colon.updateContext = function() {
	this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
}, D.backQuote.updateContext = function() {
	this.curContext() === G.q_tmpl ? this.context.pop() : this.context.push(G.q_tmpl), this.exprAllowed = !1;
}, D.star.updateContext = function(e) {
	if (e === D._function) {
		var t = this.context.length - 1;
		this.context[t] === G.f_expr ? this.context[t] = G.f_expr_gen : this.context[t] = G.f_gen;
	}
	this.exprAllowed = !0;
}, D.name.updateContext = function(e) {
	var t = !1;
	this.options.ecmaVersion >= 6 && e !== D.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
};
var K = I.prototype;
K.checkPropClash = function(e, t, n) {
	if (!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
		var r = e.key, i;
		switch (r.type) {
			case "Identifier":
				i = r.name;
				break;
			case "Literal":
				i = String(r.value);
				break;
			default: return;
		}
		var a = e.kind;
		if (this.options.ecmaVersion >= 6) {
			i === "__proto__" && a === "init" && (t.proto && (n ? n.doubleProto < 0 && (n.doubleProto = r.start) : this.raiseRecoverable(r.start, "Redefinition of __proto__ property")), t.proto = !0);
			return;
		}
		i = "$" + i;
		var o = t[i];
		o ? (a === "init" ? this.strict && o.init || o.get || o.set : o.init || o[a]) && this.raiseRecoverable(r.start, "Redefinition of property") : o = t[i] = {
			init: !1,
			get: !1,
			set: !1
		}, o[a] = !0;
	}
}, K.parseExpression = function(e, t) {
	var n = this;
	return this.catchStackOverflow(function() {
		var r = n.start, i = n.startLoc, a = n.parseMaybeAssign(e, t);
		if (n.type === D.comma) {
			var o = n.startNodeAt(r, i);
			for (o.expressions = [a]; n.eat(D.comma);) o.expressions.push(n.parseMaybeAssign(e, t));
			return n.finishNode(o, "SequenceExpression");
		}
		return a;
	});
}, K.parseMaybeAssign = function(e, t, n) {
	if (this.isContextual("yield")) {
		if (this.inGenerator) return this.parseYield(e);
		this.exprAllowed = !1;
	}
	var r = !1, i = -1, a = -1, o = -1;
	t ? (i = t.parenthesizedAssign, a = t.trailingComma, o = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new B(), r = !0);
	var s = this.start, c = this.startLoc;
	(this.type === D.parenL || this.type === D.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
	var l = this.parseMaybeConditional(e, t);
	if (n && (l = n.call(this, l, s, c)), this.type.isAssign) {
		var u = this.startNodeAt(s, c);
		return u.operator = this.value, this.type === D.eq && (l = this.toAssignable(l, !1, t)), r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= l.start && (t.shorthandAssign = -1), this.type === D.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), u.left = l, this.next(), u.right = this.parseMaybeAssign(e), o > -1 && (t.doubleProto = o), this.finishNode(u, "AssignmentExpression");
	} else r && this.checkExpressionErrors(t, !0);
	return i > -1 && (t.parenthesizedAssign = i), a > -1 && (t.trailingComma = a), l;
}, K.parseMaybeConditional = function(e, t) {
	var n = this.start, r = this.startLoc, i = this.parseExprOps(e, t);
	if (this.checkExpressionErrors(t)) return i;
	if (!(i.type === "ArrowFunctionExpression" && i.start === n) && this.eat(D.question)) {
		var a = this.startNodeAt(n, r);
		return a.test = i, a.consequent = this.parseMaybeAssign(), this.expect(D.colon), a.alternate = this.parseMaybeAssign(e), this.finishNode(a, "ConditionalExpression");
	}
	return i;
}, K.parseExprOps = function(e, t) {
	var n = this.start, r = this.startLoc, i = this.parseMaybeUnary(t, !1, !1, e);
	return this.checkExpressionErrors(t) || i.start === n && i.type === "ArrowFunctionExpression" ? i : this.parseExprOp(i, n, r, -1, e);
}, K.parseExprOp = function(e, t, n, r, i) {
	var a = this.type.binop;
	if (a != null && (!i || this.type !== D._in) && a > r) {
		var o = this.type === D.logicalOR || this.type === D.logicalAND, s = this.type === D.coalesce;
		s && (a = D.logicalAND.binop);
		var c = this.value;
		this.next();
		var l = this.start, u = this.startLoc, d = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, i), l, u, a, i), f = this.buildBinary(t, n, e, d, c, o || s);
		return (o && this.type === D.coalesce || s && (this.type === D.logicalOR || this.type === D.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(f, t, n, r, i);
	}
	return e;
}, K.buildBinary = function(e, t, n, r, i, a) {
	r.type === "PrivateIdentifier" && this.raise(r.start, "Private identifier can only be left side of binary expression");
	var o = this.startNodeAt(e, t);
	return o.left = n, o.operator = i, o.right = r, this.finishNode(o, a ? "LogicalExpression" : "BinaryExpression");
}, K.parseMaybeUnary = function(e, t, n, r) {
	var i = this.start, a = this.startLoc, o;
	if (this.isContextual("await") && this.canAwait) o = this.parseAwait(r), t = !0;
	else if (this.type.prefix) {
		var s = this.startNode(), c = this.type === D.incDec;
		s.operator = this.value, s.prefix = !0, this.next(), s.argument = this.parseMaybeUnary(null, !0, c, r), this.checkExpressionErrors(e, !0), c ? this.checkLValSimple(s.argument) : this.strict && s.operator === "delete" && Ke(s.argument) ? this.raiseRecoverable(s.start, "Deleting local variable in strict mode") : s.operator === "delete" && qe(s.argument) ? this.raiseRecoverable(s.start, "Private fields can not be deleted") : t = !0, o = this.finishNode(s, c ? "UpdateExpression" : "UnaryExpression");
	} else if (!t && this.type === D.privateId) (r || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), o = this.parsePrivateIdent(), this.type !== D._in && this.unexpected();
	else {
		if (o = this.parseExprSubscripts(e, r), this.checkExpressionErrors(e)) return o;
		for (; this.type.postfix && !this.canInsertSemicolon();) {
			var l = this.startNodeAt(i, a);
			l.operator = this.value, l.prefix = !1, l.argument = o, this.checkLValSimple(o), this.next(), o = this.finishNode(l, "UpdateExpression");
		}
	}
	if (!n && this.eat(D.starstar)) if (t) this.unexpected(this.lastTokStart);
	else return this.buildBinary(i, a, o, this.parseMaybeUnary(null, !1, !1, r), "**", !1);
	else return o;
};
function Ke(e) {
	return e.type === "Identifier" || e.type === "ParenthesizedExpression" && Ke(e.expression);
}
function qe(e) {
	return e.type === "MemberExpression" && e.property.type === "PrivateIdentifier" || e.type === "ChainExpression" && qe(e.expression) || e.type === "ParenthesizedExpression" && qe(e.expression);
}
K.parseExprSubscripts = function(e, t) {
	var n = this.start, r = this.startLoc, i = this.parseExprAtom(e, t);
	if (i.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") return i;
	var a = this.parseSubscripts(i, n, r, !1, t);
	return e && a.type === "MemberExpression" && (e.parenthesizedAssign >= a.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= a.start && (e.parenthesizedBind = -1), e.trailingComma >= a.start && (e.trailingComma = -1)), a;
}, K.parseSubscripts = function(e, t, n, r, i) {
	for (var a = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, o = !1;;) {
		var s = this.parseSubscript(e, t, n, r, a, o, i);
		if (s.optional && (o = !0), s === e || s.type === "ArrowFunctionExpression") {
			if (o) {
				var c = this.startNodeAt(t, n);
				c.expression = s, s = this.finishNode(c, "ChainExpression");
			}
			return s;
		}
		e = s;
	}
}, K.shouldParseAsyncArrow = function() {
	return !this.canInsertSemicolon() && this.eat(D.arrow);
}, K.parseSubscriptAsyncArrow = function(e, t, n, r) {
	return this.parseArrowExpression(this.startNodeAt(e, t), n, !0, r);
}, K.parseSubscript = function(e, t, n, r, i, a, o) {
	var s = this.options.ecmaVersion >= 11, c = s && this.eat(D.questionDot);
	r && c && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
	var l = this.eat(D.bracketL);
	if (l || c && this.type !== D.parenL && this.type !== D.backQuote || this.eat(D.dot)) {
		var u = this.startNodeAt(t, n);
		u.object = e, l ? (u.property = this.parseExpression(), this.expect(D.bracketR)) : this.type === D.privateId && e.type !== "Super" ? u.property = this.parsePrivateIdent() : u.property = this.parseIdent(this.options.allowReserved !== "never"), u.computed = !!l, s && (u.optional = c), e = this.finishNode(u, "MemberExpression");
	} else if (!r && this.eat(D.parenL)) {
		var d = new B(), f = this.yieldPos, p = this.awaitPos, m = this.awaitIdentPos;
		this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
		var h = this.parseExprList(D.parenR, this.options.ecmaVersion >= 8, !1, d);
		if (i && !c && this.shouldParseAsyncArrow()) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = f, this.awaitPos = p, this.awaitIdentPos = m, this.parseSubscriptAsyncArrow(t, n, h, o);
		this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, this.awaitIdentPos = m || this.awaitIdentPos;
		var g = this.startNodeAt(t, n);
		g.callee = e, g.arguments = h, s && (g.optional = c), e = this.finishNode(g, "CallExpression");
	} else if (this.type === D.backQuote) {
		(c || a) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
		var _ = this.startNodeAt(t, n);
		_.tag = e, _.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(_, "TaggedTemplateExpression");
	}
	return e;
}, K.parseExprAtom = function(e, t, n) {
	this.type === D.slash && this.readRegexp();
	var r, i = this.potentialArrowAt === this.start;
	switch (this.type) {
		case D._super: return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), r = this.startNode(), this.next(), this.type === D.parenL && !this.allowDirectSuper && this.raise(r.start, "super() call outside constructor of a subclass"), this.type !== D.dot && this.type !== D.bracketL && this.type !== D.parenL && this.unexpected(), this.finishNode(r, "Super");
		case D._this: return r = this.startNode(), this.next(), this.finishNode(r, "ThisExpression");
		case D.name:
			var a = this.start, o = this.startLoc, s = this.containsEsc, c = this.parseIdent(!1);
			if (this.options.ecmaVersion >= 8 && !s && c.name === "async" && !this.canInsertSemicolon() && this.eat(D._function)) return this.overrideContext(G.f_expr), this.parseFunction(this.startNodeAt(a, o), 0, !1, !0, t);
			if (i && !this.canInsertSemicolon()) {
				if (this.eat(D.arrow)) return this.parseArrowExpression(this.startNodeAt(a, o), [c], !1, t);
				if (this.options.ecmaVersion >= 8 && c.name === "async" && this.type === D.name && !s && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) return c = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(D.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(a, o), [c], !0, t);
			}
			return c;
		case D.regexp:
			var l = this.value;
			return r = this.parseLiteral(l.value), r.regex = {
				pattern: l.pattern,
				flags: l.flags
			}, r;
		case D.num:
		case D.string: return this.parseLiteral(this.value);
		case D._null:
		case D._true:
		case D._false: return r = this.startNode(), r.value = this.type === D._null ? null : this.type === D._true, r.raw = this.type.keyword, this.next(), this.finishNode(r, "Literal");
		case D.parenL:
			var u = this.start, d = this.parseParenAndDistinguishExpression(i, t);
			return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(d) && (e.parenthesizedAssign = u), e.parenthesizedBind < 0 && (e.parenthesizedBind = u)), d;
		case D.bracketL: return r = this.startNode(), this.next(), r.elements = this.parseExprList(D.bracketR, !0, !0, e), this.finishNode(r, "ArrayExpression");
		case D.braceL: return this.overrideContext(G.b_expr), this.parseObj(!1, e);
		case D._function: return r = this.startNode(), this.next(), this.parseFunction(r, 0);
		case D._class: return this.parseClass(this.startNode(), !1);
		case D._new: return this.parseNew();
		case D.backQuote: return this.parseTemplate();
		case D._import: return this.options.ecmaVersion >= 11 ? this.parseExprImport(n) : this.unexpected();
		default: return this.parseExprAtomDefault();
	}
}, K.parseExprAtomDefault = function() {
	this.unexpected();
}, K.parseExprImport = function(e) {
	var t = this.startNode();
	if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === D.parenL && !e) return this.parseDynamicImport(t);
	if (this.type === D.dot) {
		var n = this.startNodeAt(t.start, t.loc && t.loc.start);
		return n.name = "import", t.meta = this.finishNode(n, "Identifier"), this.parseImportMeta(t);
	} else this.unexpected();
}, K.parseDynamicImport = function(e) {
	if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16) this.eat(D.parenR) ? e.options = null : (this.expect(D.comma), this.afterTrailingComma(D.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(D.parenR) || (this.expect(D.comma), this.afterTrailingComma(D.parenR) || this.unexpected())));
	else if (!this.eat(D.parenR)) {
		var t = this.start;
		this.eat(D.comma) && this.eat(D.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
	}
	return this.finishNode(e, "ImportExpression");
}, K.parseImportMeta = function(e) {
	this.next();
	var t = this.containsEsc;
	return e.property = this.parseIdent(!0), e.property.name !== "meta" && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
}, K.parseLiteral = function(e) {
	var t = this.startNode();
	return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.value == null ? t.raw.slice(0, -1).replace(/_/g, "") : t.value.toString()), this.next(), this.finishNode(t, "Literal");
}, K.parseParenExpression = function() {
	this.expect(D.parenL);
	var e = this.parseExpression();
	return this.expect(D.parenR), e;
}, K.shouldParseArrow = function(e) {
	return !this.canInsertSemicolon();
}, K.parseParenAndDistinguishExpression = function(e, t) {
	var n = this.start, r = this.startLoc, i, a = this.options.ecmaVersion >= 8;
	if (this.options.ecmaVersion >= 6) {
		this.next();
		var o = this.start, s = this.startLoc, c = [], l = !0, u = !1, d = new B(), f = this.yieldPos, p = this.awaitPos, m;
		for (this.yieldPos = 0, this.awaitPos = 0; this.type !== D.parenR;) if (l ? l = !1 : this.expect(D.comma), a && this.afterTrailingComma(D.parenR, !0)) {
			u = !0;
			break;
		} else if (this.type === D.ellipsis) {
			m = this.start, c.push(this.parseParenItem(this.parseRestBinding())), this.type === D.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
			break;
		} else c.push(this.parseMaybeAssign(!1, d, this.parseParenItem));
		var h = this.lastTokEnd, g = this.lastTokEndLoc;
		if (this.expect(D.parenR), e && this.shouldParseArrow(c) && this.eat(D.arrow)) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = f, this.awaitPos = p, this.parseParenArrowList(n, r, c, t);
		(!c.length || u) && this.unexpected(this.lastTokStart), m && this.unexpected(m), this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, c.length > 1 ? (i = this.startNodeAt(o, s), i.expressions = c, this.finishNodeAt(i, "SequenceExpression", h, g)) : i = c[0];
	} else i = this.parseParenExpression();
	if (this.options.preserveParens) {
		var _ = this.startNodeAt(n, r);
		return _.expression = i, this.finishNode(_, "ParenthesizedExpression");
	} else return i;
}, K.parseParenItem = function(e) {
	return e;
}, K.parseParenArrowList = function(e, t, n, r) {
	return this.parseArrowExpression(this.startNodeAt(e, t), n, !1, r);
};
var Je = [];
K.parseNew = function() {
	this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
	var e = this.startNode();
	if (this.next(), this.options.ecmaVersion >= 6 && this.type === D.dot) {
		var t = this.startNodeAt(e.start, e.loc && e.loc.start);
		t.name = "new", e.meta = this.finishNode(t, "Identifier"), this.next();
		var n = this.containsEsc;
		return e.property = this.parseIdent(!0), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), n && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
	}
	var r = this.start, i = this.startLoc;
	return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), r, i, !0, !1), e.callee.type === "Super" && this.raiseRecoverable(r, "Invalid use of 'super'"), this.eat(D.parenL) ? e.arguments = this.parseExprList(D.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = Je, this.finishNode(e, "NewExpression");
}, K.parseTemplateElement = function(e) {
	var t = e.isTagged, n = this.startNode();
	return this.type === D.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), n.value = {
		raw: this.value.replace(/\r\n?/g, "\n"),
		cooked: null
	}) : n.value = {
		raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
		cooked: this.value
	}, this.next(), n.tail = this.type === D.backQuote, this.finishNode(n, "TemplateElement");
}, K.parseTemplate = function(e) {
	e === void 0 && (e = {});
	var t = e.isTagged;
	t === void 0 && (t = !1);
	var n = this.startNode();
	this.next(), n.expressions = [];
	var r = this.parseTemplateElement({ isTagged: t });
	for (n.quasis = [r]; !r.tail;) this.type === D.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(D.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(D.braceR), n.quasis.push(r = this.parseTemplateElement({ isTagged: t }));
	return this.next(), this.finishNode(n, "TemplateLiteral");
}, K.isAsyncProp = function(e) {
	return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === D.name || this.type === D.num || this.type === D.string || this.type === D.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === D.star) && !O.test(this.input.slice(this.lastTokEnd, this.start));
}, K.parseObj = function(e, t) {
	var n = this.startNode(), r = !0, i = {};
	for (n.properties = [], this.next(); !this.eat(D.braceR);) {
		if (r) r = !1;
		else if (this.expect(D.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(D.braceR)) break;
		var a = this.parseProperty(e, t);
		e || this.checkPropClash(a, i, t), n.properties.push(a);
	}
	return this.finishNode(n, e ? "ObjectPattern" : "ObjectExpression");
}, K.parseProperty = function(e, t) {
	var n = this.startNode(), r, i, a, o;
	if (this.options.ecmaVersion >= 9 && this.eat(D.ellipsis)) return e ? (n.argument = this.parseIdent(!1), this.type === D.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(n, "RestElement")) : (n.argument = this.parseMaybeAssign(!1, t), this.type === D.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(n, "SpreadElement"));
	this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (e || t) && (a = this.start, o = this.startLoc), e || (r = this.eat(D.star)));
	var s = this.containsEsc;
	return this.parsePropertyName(n), !e && !s && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(n) ? (i = !0, r = this.options.ecmaVersion >= 9 && this.eat(D.star), this.parsePropertyName(n)) : i = !1, this.parsePropertyValue(n, e, r, i, a, o, t, s), this.finishNode(n, "Property");
}, K.parseGetterSetter = function(e) {
	var t = e.key.name;
	this.parsePropertyName(e), e.value = this.parseMethod(!1), e.kind = t;
	var n = e.kind === "get" ? 0 : 1;
	if (e.value.params.length !== n) {
		var r = e.value.start;
		e.kind === "get" ? this.raiseRecoverable(r, "getter should have no params") : this.raiseRecoverable(r, "setter should have exactly one param");
	} else e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
}, K.parsePropertyValue = function(e, t, n, r, i, a, o, s) {
	(n || r) && this.type === D.colon && this.unexpected(), this.eat(D.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, o), e.kind = "init") : this.options.ecmaVersion >= 6 && this.type === D.parenL ? (t && this.unexpected(), e.method = !0, e.value = this.parseMethod(n, r), e.kind = "init") : !t && !s && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== D.comma && this.type !== D.braceR && this.type !== D.eq ? ((n || r) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier" ? ((n || r) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = i), t ? e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key)) : this.type === D.eq && o ? (o.shorthandAssign < 0 && (o.shorthandAssign = this.start), e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.kind = "init", e.shorthand = !0) : this.unexpected();
}, K.parsePropertyName = function(e) {
	if (this.options.ecmaVersion >= 6) {
		if (this.eat(D.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(D.bracketR), e.key;
		e.computed = !1;
	}
	return e.key = this.type === D.num || this.type === D.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
}, K.initFunction = function(e) {
	e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
}, K.parseMethod = function(e, t, n) {
	var r = this.startNode(), i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
	return this.initFunction(r), this.options.ecmaVersion >= 6 && (r.generator = e), this.options.ecmaVersion >= 8 && (r.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(F(t, r.generator) | ke | (n ? M : 0)), this.expect(D.parenL), r.params = this.parseBindingList(D.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(r, "FunctionExpression");
}, K.parseArrowExpression = function(e, t, n, r) {
	var i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
	return this.enterScope(F(n, !1) | De), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, r), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(e, "ArrowFunctionExpression");
}, K.parseFunctionBody = function(e, t, n, r) {
	var i = t && this.type !== D.braceL, a = this.strict, o = !1;
	if (i) e.body = this.parseMaybeAssign(r), e.expression = !0, this.checkParams(e, !1);
	else {
		var s = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
		(!a || s) && (o = this.strictDirective(this.end), o && s && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
		var c = this.labels;
		this.labels = [], o && (this.strict = !0), this.checkParams(e, !a && !o && !t && !n && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, Le), e.body = this.parseBlock(!1, void 0, o && !a), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = c;
	}
	this.exitScope();
}, K.isSimpleParamList = function(e) {
	for (var t = 0, n = e; t < n.length; t += 1) if (n[t].type !== "Identifier") return !1;
	return !0;
}, K.checkParams = function(e, t) {
	for (var n = Object.create(null), r = 0, i = e.params; r < i.length; r += 1) {
		var a = i[r];
		this.checkLValInnerPattern(a, Ne, t ? null : n);
	}
}, K.parseExprList = function(e, t, n, r) {
	for (var i = [], a = !0; !this.eat(e);) {
		if (a) a = !1;
		else if (this.expect(D.comma), t && this.afterTrailingComma(e)) break;
		var o = void 0;
		n && this.type === D.comma ? o = null : this.type === D.ellipsis ? (o = this.parseSpread(r), r && this.type === D.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : o = this.parseMaybeAssign(!1, r), i.push(o);
	}
	return i;
}, K.checkUnreserved = function(e) {
	var t = e.start, n = e.end, r = e.name;
	this.inGenerator && r === "yield" && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), !(this.currentThisScope().flags & je) && r === "arguments" && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (r === "arguments" || r === "await") && this.raise(t, "Cannot use " + r + " in class static initialization block"), this.keywords.test(r) && this.raise(t, "Unexpected keyword '" + r + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(t, n).indexOf("\\") !== -1) && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(r) && (!this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + r + "' is reserved"));
}, K.parseIdent = function(e) {
	var t = this.parseIdentNode();
	return this.next(!!e), this.finishNode(t, "Identifier"), e || (this.checkUnreserved(t), t.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
}, K.parseIdentNode = function() {
	var e = this.startNode();
	return this.type === D.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === "class" || e.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = D.name) : this.unexpected(), e;
}, K.parsePrivateIdent = function() {
	var e = this.startNode();
	return this.type === D.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
}, K.parseYield = function(e) {
	this.yieldPos ||= this.start;
	var t = this.startNode();
	return this.next(), this.type === D.semi || this.canInsertSemicolon() || this.type !== D.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(D.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
}, K.parseAwait = function(e) {
	this.awaitPos ||= this.start;
	var t = this.startNode();
	return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression");
};
var Ye = I.prototype;
Ye.raise = function(e, t) {
	var n = ye(this.input, e);
	t += " (" + n.line + ":" + n.column + ")", this.sourceFile && (t += " in " + this.sourceFile);
	var r = SyntaxError(t);
	throw r.pos = e, r.loc = n, r.raisedAt = this.pos, r;
}, Ye.raiseRecoverable = Ye.raise, Ye.curPosition = function() {
	if (this.options.locations) return new _e(this.curLine, this.pos - this.lineStart);
};
var Xe = I.prototype, Ze = function(e) {
	this.flags = e, this.var = [], this.lexical = [], this.functions = [];
};
Xe.enterScope = function(e) {
	this.scopeStack.push(new Ze(e));
}, Xe.exitScope = function() {
	this.scopeStack.pop();
}, Xe.treatFunctionsAsVarInScope = function(e) {
	return e.flags & Te || !this.inModule && e.flags & we;
}, Xe.declareName = function(e, t, n) {
	var r = !1;
	if (t === Pe) {
		var i = this.currentScope();
		r = i.lexical.indexOf(e) > -1 || i.functions.indexOf(e) > -1 || i.var.indexOf(e) > -1, i.lexical.push(e), this.inModule && i.flags & we && delete this.undefinedExports[e];
	} else if (t === Ie) this.currentScope().lexical.push(e);
	else if (t === Fe) {
		var a = this.currentScope();
		r = this.treatFunctionsAsVar ? a.lexical.indexOf(e) > -1 : a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.functions.push(e);
	} else for (var o = this.scopeStack.length - 1; o >= 0; --o) {
		var s = this.scopeStack[o];
		if (s.lexical.indexOf(e) > -1 && !(s.flags & Oe && s.lexical[0] === e) || !this.treatFunctionsAsVarInScope(s) && s.functions.indexOf(e) > -1) {
			r = !0;
			break;
		}
		if (s.var.push(e), this.inModule && s.flags & we && delete this.undefinedExports[e], s.flags & je) break;
	}
	r && this.raiseRecoverable(n, "Identifier '" + e + "' has already been declared");
}, Xe.checkLocalExport = function(e) {
	this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
}, Xe.currentScope = function() {
	return this.scopeStack[this.scopeStack.length - 1];
}, Xe.currentVarScope = function() {
	for (var e = this.scopeStack.length - 1;; e--) {
		var t = this.scopeStack[e];
		if (t.flags & (je | P | N)) return t;
	}
}, Xe.currentThisScope = function() {
	for (var e = this.scopeStack.length - 1;; e--) {
		var t = this.scopeStack[e];
		if (t.flags & (je | P | N) && !(t.flags & De)) return t;
	}
};
var Qe = function(e, t, n) {
	this.type = "", this.start = t, this.end = 0, e.options.locations && (this.loc = new ve(e, n)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0]);
}, $e = I.prototype;
$e.startNode = function() {
	return new Qe(this, this.start, this.startLoc);
}, $e.startNodeAt = function(e, t) {
	return new Qe(this, e, t);
};
function et(e, t, n, r) {
	return e.type = t, e.end = n, this.options.locations && (e.loc.end = r), this.options.ranges && (e.range[1] = n), e;
}
$e.finishNode = function(e, t) {
	return et.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
}, $e.finishNodeAt = function(e, t, n, r) {
	return et.call(this, e, t, n, r);
}, $e.copyNode = function(e) {
	var t = new Qe(this, e.start, this.startLoc);
	for (var n in e) t[n] = e[n];
	return t;
};
var tt = "Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz", nt = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", rt = nt + " Extended_Pictographic", it = rt, at = it + " EBase EComp EMod EPres ExtPict", ot = at, st = {
	9: nt,
	10: rt,
	11: it,
	12: at,
	13: ot,
	14: ot
}, ct = {
	9: "",
	10: "",
	11: "",
	12: "",
	13: "",
	14: "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji"
}, q = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", lt = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", J = lt + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", ut = J + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", dt = ut + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", ft = dt + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", pt = {
	9: lt,
	10: J,
	11: ut,
	12: dt,
	13: ft,
	14: ft + " " + tt
}, mt = {};
function ht(e) {
	var t = mt[e] = {
		binary: A(st[e] + " " + q),
		binaryOfStrings: A(ct[e]),
		nonBinary: {
			General_Category: A(q),
			Script: A(pt[e])
		}
	};
	t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
}
for (var gt = 0, _t = [
	9,
	10,
	11,
	12,
	13,
	14
]; gt < _t.length; gt += 1) {
	var vt = _t[gt];
	ht(vt);
}
var Y = I.prototype, yt = function(e, t) {
	this.parent = e, this.base = t || this;
};
yt.prototype.separatedFrom = function(e) {
	for (var t = this; t; t = t.parent) for (var n = e; n; n = n.parent) if (t.base === n.base && t !== n) return !0;
	return !1;
}, yt.prototype.sibling = function() {
	return new yt(this.parent, this.base);
};
var X = function(e) {
	this.parser = e, this.validFlags = "gim" + (e.options.ecmaVersion >= 6 ? "uy" : "") + (e.options.ecmaVersion >= 9 ? "s" : "") + (e.options.ecmaVersion >= 13 ? "d" : "") + (e.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = mt[e.options.ecmaVersion >= 14 ? 14 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = Object.create(null), this.backReferenceNames = [], this.branchID = null;
};
X.prototype.reset = function(e, t, n) {
	var r = n.indexOf("v") !== -1, i = n.indexOf("u") !== -1;
	this.start = e | 0, this.source = t + "", this.flags = n, r && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = i && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = i && this.parser.options.ecmaVersion >= 9);
}, X.prototype.raise = function(e) {
	this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e);
}, X.prototype.at = function(e, t) {
	t === void 0 && (t = !1);
	var n = this.source, r = n.length;
	if (e >= r) return -1;
	var i = n.charCodeAt(e);
	if (!(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r) return i;
	var a = n.charCodeAt(e + 1);
	return a >= 56320 && a <= 57343 ? (i << 10) + a - 56613888 : i;
}, X.prototype.nextIndex = function(e, t) {
	t === void 0 && (t = !1);
	var n = this.source, r = n.length;
	if (e >= r) return r;
	var i = n.charCodeAt(e), a;
	return !(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r || (a = n.charCodeAt(e + 1)) < 56320 || a > 57343 ? e + 1 : e + 2;
}, X.prototype.current = function(e) {
	return e === void 0 && (e = !1), this.at(this.pos, e);
}, X.prototype.lookahead = function(e) {
	return e === void 0 && (e = !1), this.at(this.nextIndex(this.pos, e), e);
}, X.prototype.advance = function(e) {
	e === void 0 && (e = !1), this.pos = this.nextIndex(this.pos, e);
}, X.prototype.eat = function(e, t) {
	return t === void 0 && (t = !1), this.current(t) === e ? (this.advance(t), !0) : !1;
}, X.prototype.eatChars = function(e, t) {
	t === void 0 && (t = !1);
	for (var n = this.pos, r = 0, i = e; r < i.length; r += 1) {
		var a = i[r], o = this.at(n, t);
		if (o === -1 || o !== a) return !1;
		n = this.nextIndex(n, t);
	}
	return this.pos = n, !0;
}, Y.validateRegExpFlags = function(e) {
	for (var t = e.validFlags, n = e.flags, r = !1, i = !1, a = 0; a < n.length; a++) {
		var o = n.charAt(a);
		t.indexOf(o) === -1 && this.raise(e.start, "Invalid regular expression flag"), n.indexOf(o, a + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag"), o === "u" && (r = !0), o === "v" && (i = !0);
	}
	this.options.ecmaVersion >= 15 && r && i && this.raise(e.start, "Invalid regular expression flag");
};
function bt(e) {
	for (var t in e) return !0;
	return !1;
}
Y.validateRegExpPattern = function(e) {
	this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && bt(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
}, Y.regexp_pattern = function(e) {
	e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"), (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
	for (var t = 0, n = e.backReferenceNames; t < n.length; t += 1) {
		var r = n[t];
		e.groupNames[r] || e.raise("Invalid named capture referenced");
	}
}, Y.regexp_disjunction = function(e) {
	var t = this.options.ecmaVersion >= 16;
	for (t && (e.branchID = new yt(e.branchID, null)), this.regexp_alternative(e); e.eat(124);) t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
	t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(123) && e.raise("Lone quantifier brackets");
}, Y.regexp_alternative = function(e) {
	for (; e.pos < e.source.length && this.regexp_eatTerm(e););
}, Y.regexp_eatTerm = function(e) {
	return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
}, Y.regexp_eatAssertion = function(e) {
	var t = e.pos;
	if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;
	if (e.eat(92)) {
		if (e.eat(66) || e.eat(98)) return !0;
		e.pos = t;
	}
	if (e.eat(40) && e.eat(63)) {
		var n = !1;
		if (this.options.ecmaVersion >= 9 && (n = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(e), e.eat(41) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !n, !0;
	}
	return e.pos = t, !1;
}, Y.regexp_eatQuantifier = function(e, t) {
	return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1;
}, Y.regexp_eatQuantifierPrefix = function(e, t) {
	return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
}, Y.regexp_eatBracedQuantifier = function(e, t) {
	var n = e.pos;
	if (e.eat(123)) {
		var r = 0, i = -1;
		if (this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue), e.eat(125))) return i !== -1 && i < r && !t && e.raise("numbers out of order in {} quantifier"), !0;
		e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = n;
	}
	return !1;
}, Y.regexp_eatAtom = function(e) {
	return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
}, Y.regexp_eatReverseSolidusAtomEscape = function(e) {
	var t = e.pos;
	if (e.eat(92)) {
		if (this.regexp_eatAtomEscape(e)) return !0;
		e.pos = t;
	}
	return !1;
}, Y.regexp_eatUncapturingGroup = function(e) {
	var t = e.pos;
	if (e.eat(40)) {
		if (e.eat(63)) {
			if (this.options.ecmaVersion >= 16) {
				var n = this.regexp_eatModifiers(e), r = e.eat(45);
				if (n || r) {
					for (var i = 0; i < n.length; i++) {
						var a = n.charAt(i);
						n.indexOf(a, i + 1) > -1 && e.raise("Duplicate regular expression modifiers");
					}
					if (r) {
						var o = this.regexp_eatModifiers(e);
						!n && !o && e.current() === 58 && e.raise("Invalid regular expression modifiers");
						for (var s = 0; s < o.length; s++) {
							var c = o.charAt(s);
							(o.indexOf(c, s + 1) > -1 || n.indexOf(c) > -1) && e.raise("Duplicate regular expression modifiers");
						}
					}
				}
			}
			if (e.eat(58)) {
				if (this.regexp_disjunction(e), e.eat(41)) return !0;
				e.raise("Unterminated group");
			}
		}
		e.pos = t;
	}
	return !1;
}, Y.regexp_eatCapturingGroup = function(e) {
	if (e.eat(40)) {
		if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
		e.raise("Unterminated group");
	}
	return !1;
}, Y.regexp_eatModifiers = function(e) {
	for (var t = "", n = 0; (n = e.current()) !== -1 && xt(n);) t += he(n), e.advance();
	return t;
};
function xt(e) {
	return e === 105 || e === 109 || e === 115;
}
Y.regexp_eatExtendedAtom = function(e) {
	return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
}, Y.regexp_eatInvalidBracedQuantifier = function(e) {
	return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;
}, Y.regexp_eatSyntaxCharacter = function(e) {
	var t = e.current();
	return St(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function St(e) {
	return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
}
Y.regexp_eatPatternCharacters = function(e) {
	for (var t = e.pos, n = 0; (n = e.current()) !== -1 && !St(n);) e.advance();
	return e.pos !== t;
}, Y.regexp_eatExtendedPatternCharacter = function(e) {
	var t = e.current();
	return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
}, Y.regexp_groupSpecifier = function(e) {
	if (e.eat(63)) {
		this.regexp_eatGroupName(e) || e.raise("Invalid group");
		var t = this.options.ecmaVersion >= 16, n = e.groupNames[e.lastStringValue];
		if (n) if (t) for (var r = 0, i = n; r < i.length; r += 1) i[r].separatedFrom(e.branchID) || e.raise("Duplicate capture group name");
		else e.raise("Duplicate capture group name");
		t ? (n || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
	}
}, Y.regexp_eatGroupName = function(e) {
	if (e.lastStringValue = "", e.eat(60)) {
		if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
		e.raise("Invalid capture group name");
	}
	return !1;
}, Y.regexp_eatRegExpIdentifierName = function(e) {
	if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
		for (e.lastStringValue += he(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) e.lastStringValue += he(e.lastIntValue);
		return !0;
	}
	return !1;
}, Y.regexp_eatRegExpIdentifierStart = function(e) {
	var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
	return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), Ct(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
};
function Ct(e) {
	return x(e, !0) || e === 36 || e === 95;
}
Y.regexp_eatRegExpIdentifierPart = function(e) {
	var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
	return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), wt(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
};
function wt(e) {
	return re(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
}
Y.regexp_eatAtomEscape = function(e) {
	return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1);
}, Y.regexp_eatBackReference = function(e) {
	var t = e.pos;
	if (this.regexp_eatDecimalEscape(e)) {
		var n = e.lastIntValue;
		if (e.switchU) return n > e.maxBackReference && (e.maxBackReference = n), !0;
		if (n <= e.numCapturingParens) return !0;
		e.pos = t;
	}
	return !1;
}, Y.regexp_eatKGroupName = function(e) {
	if (e.eat(107)) {
		if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
		e.raise("Invalid named reference");
	}
	return !1;
}, Y.regexp_eatCharacterEscape = function(e) {
	return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
}, Y.regexp_eatCControlLetter = function(e) {
	var t = e.pos;
	if (e.eat(99)) {
		if (this.regexp_eatControlLetter(e)) return !0;
		e.pos = t;
	}
	return !1;
}, Y.regexp_eatZero = function(e) {
	return e.current() === 48 && !Pt(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
}, Y.regexp_eatControlEscape = function(e) {
	var t = e.current();
	return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
}, Y.regexp_eatControlLetter = function(e) {
	var t = e.current();
	return Tt(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
function Tt(e) {
	return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
Y.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
	t === void 0 && (t = !1);
	var n = e.pos, r = t || e.switchU;
	if (e.eat(117)) {
		if (this.regexp_eatFixedHexDigits(e, 4)) {
			var i = e.lastIntValue;
			if (r && i >= 55296 && i <= 56319) {
				var a = e.pos;
				if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
					var o = e.lastIntValue;
					if (o >= 56320 && o <= 57343) return e.lastIntValue = (i - 55296) * 1024 + (o - 56320) + 65536, !0;
				}
				e.pos = a, e.lastIntValue = i;
			}
			return !0;
		}
		if (r && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && Et(e.lastIntValue)) return !0;
		r && e.raise("Invalid unicode escape"), e.pos = n;
	}
	return !1;
};
function Et(e) {
	return e >= 0 && e <= 1114111;
}
Y.regexp_eatIdentityEscape = function(e) {
	if (e.switchU) return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(47) ? (e.lastIntValue = 47, !0) : !1;
	var t = e.current();
	return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
}, Y.regexp_eatDecimalEscape = function(e) {
	e.lastIntValue = 0;
	var t = e.current();
	if (t >= 49 && t <= 57) {
		do
			e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
		while ((t = e.current()) >= 48 && t <= 57);
		return !0;
	}
	return !1;
};
var Dt = 0, Z = 1, Q = 2;
Y.regexp_eatCharacterClassEscape = function(e) {
	var t = e.current();
	if (Ot(t)) return e.lastIntValue = -1, e.advance(), Z;
	var n = !1;
	if (e.switchU && this.options.ecmaVersion >= 9 && ((n = t === 80) || t === 112)) {
		e.lastIntValue = -1, e.advance();
		var r;
		if (e.eat(123) && (r = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(125)) return n && r === Q && e.raise("Invalid property name"), r;
		e.raise("Invalid property name");
	}
	return Dt;
};
function Ot(e) {
	return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
}
Y.regexp_eatUnicodePropertyValueExpression = function(e) {
	var t = e.pos;
	if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
		var n = e.lastStringValue;
		if (this.regexp_eatUnicodePropertyValue(e)) {
			var r = e.lastStringValue;
			return this.regexp_validateUnicodePropertyNameAndValue(e, n, r), Z;
		}
	}
	if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
		var i = e.lastStringValue;
		return this.regexp_validateUnicodePropertyNameOrValue(e, i);
	}
	return Dt;
}, Y.regexp_validateUnicodePropertyNameAndValue = function(e, t, n) {
	fe(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(n) || e.raise("Invalid property value");
}, Y.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
	if (e.unicodeProperties.binary.test(t)) return Z;
	if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return Q;
	e.raise("Invalid property name");
}, Y.regexp_eatUnicodePropertyName = function(e) {
	var t = 0;
	for (e.lastStringValue = ""; kt(t = e.current());) e.lastStringValue += he(t), e.advance();
	return e.lastStringValue !== "";
};
function kt(e) {
	return Tt(e) || e === 95;
}
Y.regexp_eatUnicodePropertyValue = function(e) {
	var t = 0;
	for (e.lastStringValue = ""; At(t = e.current());) e.lastStringValue += he(t), e.advance();
	return e.lastStringValue !== "";
};
function At(e) {
	return kt(e) || Pt(e);
}
Y.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
	return this.regexp_eatUnicodePropertyValue(e);
}, Y.regexp_eatCharacterClass = function(e) {
	if (e.eat(91)) {
		var t = e.eat(94), n = this.regexp_classContents(e);
		return e.eat(93) || e.raise("Unterminated character class"), t && n === Q && e.raise("Negated character class may contain strings"), !0;
	}
	return !1;
}, Y.regexp_classContents = function(e) {
	return e.current() === 93 ? Z : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), Z);
}, Y.regexp_nonEmptyClassRanges = function(e) {
	for (; this.regexp_eatClassAtom(e);) {
		var t = e.lastIntValue;
		if (e.eat(45) && this.regexp_eatClassAtom(e)) {
			var n = e.lastIntValue;
			e.switchU && (t === -1 || n === -1) && e.raise("Invalid character class"), t !== -1 && n !== -1 && t > n && e.raise("Range out of order in character class");
		}
	}
}, Y.regexp_eatClassAtom = function(e) {
	var t = e.pos;
	if (e.eat(92)) {
		if (this.regexp_eatClassEscape(e)) return !0;
		if (e.switchU) {
			var n = e.current();
			(n === 99 || Lt(n)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
		}
		e.pos = t;
	}
	var r = e.current();
	return r === 93 ? !1 : (e.lastIntValue = r, e.advance(), !0);
}, Y.regexp_eatClassEscape = function(e) {
	var t = e.pos;
	if (e.eat(98)) return e.lastIntValue = 8, !0;
	if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
	if (!e.switchU && e.eat(99)) {
		if (this.regexp_eatClassControlLetter(e)) return !0;
		e.pos = t;
	}
	return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
}, Y.regexp_classSetExpression = function(e) {
	var t = Z, n;
	if (!this.regexp_eatClassSetRange(e)) if (n = this.regexp_eatClassSetOperand(e)) {
		n === Q && (t = Q);
		for (var r = e.pos; e.eatChars([38, 38]);) {
			if (e.current() !== 38 && (n = this.regexp_eatClassSetOperand(e))) {
				n !== Q && (t = Z);
				continue;
			}
			e.raise("Invalid character in character class");
		}
		if (r !== e.pos) return t;
		for (; e.eatChars([45, 45]);) this.regexp_eatClassSetOperand(e) || e.raise("Invalid character in character class");
		if (r !== e.pos) return t;
	} else e.raise("Invalid character in character class");
	for (;;) if (!this.regexp_eatClassSetRange(e)) {
		if (n = this.regexp_eatClassSetOperand(e), !n) return t;
		n === Q && (t = Q);
	}
}, Y.regexp_eatClassSetRange = function(e) {
	var t = e.pos;
	if (this.regexp_eatClassSetCharacter(e)) {
		var n = e.lastIntValue;
		if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
			var r = e.lastIntValue;
			return n !== -1 && r !== -1 && n > r && e.raise("Range out of order in character class"), !0;
		}
		e.pos = t;
	}
	return !1;
}, Y.regexp_eatClassSetOperand = function(e) {
	return this.regexp_eatClassSetCharacter(e) ? Z : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
}, Y.regexp_eatNestedClass = function(e) {
	var t = e.pos;
	if (e.eat(91)) {
		var n = e.eat(94), r = this.regexp_classContents(e);
		if (e.eat(93)) return n && r === Q && e.raise("Negated character class may contain strings"), r;
		e.pos = t;
	}
	if (e.eat(92)) {
		var i = this.regexp_eatCharacterClassEscape(e);
		if (i) return i;
		e.pos = t;
	}
	return null;
}, Y.regexp_eatClassStringDisjunction = function(e) {
	var t = e.pos;
	if (e.eatChars([92, 113])) {
		if (e.eat(123)) {
			var n = this.regexp_classStringDisjunctionContents(e);
			if (e.eat(125)) return n;
		} else e.raise("Invalid escape");
		e.pos = t;
	}
	return null;
}, Y.regexp_classStringDisjunctionContents = function(e) {
	for (var t = this.regexp_classString(e); e.eat(124);) this.regexp_classString(e) === Q && (t = Q);
	return t;
}, Y.regexp_classString = function(e) {
	for (var t = 0; this.regexp_eatClassSetCharacter(e);) t++;
	return t === 1 ? Z : Q;
}, Y.regexp_eatClassSetCharacter = function(e) {
	var t = e.pos;
	if (e.eat(92)) return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(98) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
	var n = e.current();
	return n < 0 || n === e.lookahead() && jt(n) || Mt(n) ? !1 : (e.advance(), e.lastIntValue = n, !0);
};
function jt(e) {
	return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
}
function Mt(e) {
	return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
}
Y.regexp_eatClassSetReservedPunctuator = function(e) {
	var t = e.current();
	return Nt(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function Nt(e) {
	return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
}
Y.regexp_eatClassControlLetter = function(e) {
	var t = e.current();
	return Pt(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
}, Y.regexp_eatHexEscapeSequence = function(e) {
	var t = e.pos;
	if (e.eat(120)) {
		if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
		e.switchU && e.raise("Invalid escape"), e.pos = t;
	}
	return !1;
}, Y.regexp_eatDecimalDigits = function(e) {
	var t = e.pos, n = 0;
	for (e.lastIntValue = 0; Pt(n = e.current());) e.lastIntValue = 10 * e.lastIntValue + (n - 48), e.advance();
	return e.pos !== t;
};
function Pt(e) {
	return e >= 48 && e <= 57;
}
Y.regexp_eatHexDigits = function(e) {
	var t = e.pos, n = 0;
	for (e.lastIntValue = 0; Ft(n = e.current());) e.lastIntValue = 16 * e.lastIntValue + It(n), e.advance();
	return e.pos !== t;
};
function Ft(e) {
	return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function It(e) {
	return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
}
Y.regexp_eatLegacyOctalEscapeSequence = function(e) {
	if (this.regexp_eatOctalDigit(e)) {
		var t = e.lastIntValue;
		if (this.regexp_eatOctalDigit(e)) {
			var n = e.lastIntValue;
			t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + n * 8 + e.lastIntValue : e.lastIntValue = t * 8 + n;
		} else e.lastIntValue = t;
		return !0;
	}
	return !1;
}, Y.regexp_eatOctalDigit = function(e) {
	var t = e.current();
	return Lt(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
};
function Lt(e) {
	return e >= 48 && e <= 55;
}
Y.regexp_eatFixedHexDigits = function(e, t) {
	var n = e.pos;
	e.lastIntValue = 0;
	for (var r = 0; r < t; ++r) {
		var i = e.current();
		if (!Ft(i)) return e.pos = n, !1;
		e.lastIntValue = 16 * e.lastIntValue + It(i), e.advance();
	}
	return !0;
};
var Rt = function(e) {
	this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new ve(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
}, $ = I.prototype;
$.next = function(e) {
	!e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Rt(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
}, $.getToken = function() {
	return this.next(), new Rt(this);
}, typeof Symbol < "u" && ($[Symbol.iterator] = function() {
	var e = this;
	return { next: function() {
		var t = e.getToken();
		return {
			done: t.type === D.eof,
			value: t
		};
	} };
}), $.nextToken = function() {
	var e = this.curContext();
	if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length) return this.finishToken(D.eof);
	if (e.override) return e.override(this);
	this.readToken(this.fullCharCodeAtPos());
}, $.readToken = function(e) {
	return x(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
}, $.fullCharCodeAt = function(e) {
	var t = this.input.charCodeAt(e);
	if (t <= 55295 || t >= 56320) return t;
	var n = this.input.charCodeAt(e + 1);
	return n <= 56319 || n >= 57344 ? t : (t << 10) + n - 56613888;
}, $.fullCharCodeAtPos = function() {
	return this.fullCharCodeAt(this.pos);
}, $.skipBlockComment = function() {
	var e = this.options.onComment && this.curPosition(), t = this.pos, n = this.input.indexOf("*/", this.pos += 2);
	if (n === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = n + 2, this.options.locations) for (var r = void 0, i = t; (r = se(this.input, i, this.pos)) > -1;) ++this.curLine, i = this.lineStart = r;
	this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, n), t, this.pos, e, this.curPosition());
}, $.skipLineComment = function(e) {
	for (var t = this.pos, n = this.options.onComment && this.curPosition(), r = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !oe(r);) r = this.input.charCodeAt(++this.pos);
	this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, n, this.curPosition());
}, $.skipSpace = function() {
	loop: for (; this.pos < this.input.length;) {
		var e = this.input.charCodeAt(this.pos);
		switch (e) {
			case 32:
			case 160:
				++this.pos;
				break;
			case 13: this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
			case 10:
			case 8232:
			case 8233:
				++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
				break;
			case 47:
				switch (this.input.charCodeAt(this.pos + 1)) {
					case 42:
						this.skipBlockComment();
						break;
					case 47:
						this.skipLineComment(2);
						break;
					default: break loop;
				}
				break;
			default: if (e > 8 && e < 14 || e >= 5760 && ce.test(String.fromCharCode(e))) ++this.pos;
			else break loop;
		}
	}
}, $.finishToken = function(e, t) {
	this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
	var n = this.type;
	this.type = e, this.value = t, this.updateContext(n);
}, $.readToken_dot = function() {
	var e = this.input.charCodeAt(this.pos + 1);
	if (e >= 48 && e <= 57) return this.readNumber(!0);
	var t = this.input.charCodeAt(this.pos + 2);
	return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(D.ellipsis)) : (++this.pos, this.finishToken(D.dot));
}, $.readToken_slash = function() {
	var e = this.input.charCodeAt(this.pos + 1);
	return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(D.assign, 2) : this.finishOp(D.slash, 1);
}, $.readToken_mult_modulo_exp = function(e) {
	var t = this.input.charCodeAt(this.pos + 1), n = 1, r = e === 42 ? D.star : D.modulo;
	return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++n, r = D.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(D.assign, n + 1) : this.finishOp(r, n);
}, $.readToken_pipe_amp = function(e) {
	var t = this.input.charCodeAt(this.pos + 1);
	return t === e ? this.options.ecmaVersion >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(D.assign, 3) : this.finishOp(e === 124 ? D.logicalOR : D.logicalAND, 2) : t === 61 ? this.finishOp(D.assign, 2) : this.finishOp(e === 124 ? D.bitwiseOR : D.bitwiseAND, 1);
}, $.readToken_caret = function() {
	return this.input.charCodeAt(this.pos + 1) === 61 ? this.finishOp(D.assign, 2) : this.finishOp(D.bitwiseXOR, 1);
}, $.readToken_plus_min = function(e) {
	var t = this.input.charCodeAt(this.pos + 1);
	return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || O.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(D.incDec, 2) : t === 61 ? this.finishOp(D.assign, 2) : this.finishOp(D.plusMin, 1);
}, $.readToken_lt_gt = function(e) {
	var t = this.input.charCodeAt(this.pos + 1), n = 1;
	return t === e ? (n = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(D.assign, n + 1) : this.finishOp(D.bitShift, n)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (n = 2), this.finishOp(D.relational, n));
}, $.readToken_eq_excl = function(e) {
	var t = this.input.charCodeAt(this.pos + 1);
	return t === 61 ? this.finishOp(D.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(D.arrow)) : this.finishOp(e === 61 ? D.eq : D.prefix, 1);
}, $.readToken_question = function() {
	var e = this.options.ecmaVersion;
	if (e >= 11) {
		var t = this.input.charCodeAt(this.pos + 1);
		if (t === 46) {
			var n = this.input.charCodeAt(this.pos + 2);
			if (n < 48 || n > 57) return this.finishOp(D.questionDot, 2);
		}
		if (t === 63) return e >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(D.assign, 3) : this.finishOp(D.coalesce, 2);
	}
	return this.finishOp(D.question, 1);
}, $.readToken_numberSign = function() {
	var e = this.options.ecmaVersion, t = 35;
	if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), x(t, !0) || t === 92)) return this.finishToken(D.privateId, this.readWord1());
	this.raise(this.pos, "Unexpected character '" + he(t) + "'");
}, $.getTokenFromCode = function(e) {
	switch (e) {
		case 46: return this.readToken_dot();
		case 40: return ++this.pos, this.finishToken(D.parenL);
		case 41: return ++this.pos, this.finishToken(D.parenR);
		case 59: return ++this.pos, this.finishToken(D.semi);
		case 44: return ++this.pos, this.finishToken(D.comma);
		case 91: return ++this.pos, this.finishToken(D.bracketL);
		case 93: return ++this.pos, this.finishToken(D.bracketR);
		case 123: return ++this.pos, this.finishToken(D.braceL);
		case 125: return ++this.pos, this.finishToken(D.braceR);
		case 58: return ++this.pos, this.finishToken(D.colon);
		case 96:
			if (this.options.ecmaVersion < 6) break;
			return ++this.pos, this.finishToken(D.backQuote);
		case 48:
			var t = this.input.charCodeAt(this.pos + 1);
			if (t === 120 || t === 88) return this.readRadixNumber(16);
			if (this.options.ecmaVersion >= 6) {
				if (t === 111 || t === 79) return this.readRadixNumber(8);
				if (t === 98 || t === 66) return this.readRadixNumber(2);
			}
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57: return this.readNumber(!1);
		case 34:
		case 39: return this.readString(e);
		case 47: return this.readToken_slash();
		case 37:
		case 42: return this.readToken_mult_modulo_exp(e);
		case 124:
		case 38: return this.readToken_pipe_amp(e);
		case 94: return this.readToken_caret();
		case 43:
		case 45: return this.readToken_plus_min(e);
		case 60:
		case 62: return this.readToken_lt_gt(e);
		case 61:
		case 33: return this.readToken_eq_excl(e);
		case 63: return this.readToken_question();
		case 126: return this.finishOp(D.prefix, 1);
		case 35: return this.readToken_numberSign();
	}
	this.raise(this.pos, "Unexpected character '" + he(e) + "'");
}, $.finishOp = function(e, t) {
	var n = this.input.slice(this.pos, this.pos + t);
	return this.pos += t, this.finishToken(e, n);
}, $.readRegexp = function() {
	for (var e, t, n = this.pos;;) {
		this.pos >= this.input.length && this.raise(n, "Unterminated regular expression");
		var r = this.input.charAt(this.pos);
		if (O.test(r) && this.raise(n, "Unterminated regular expression"), e) e = !1;
		else {
			if (r === "[") t = !0;
			else if (r === "]" && t) t = !1;
			else if (r === "/" && !t) break;
			e = r === "\\";
		}
		++this.pos;
	}
	var i = this.input.slice(n, this.pos);
	++this.pos;
	var a = this.pos, o = this.readWord1();
	this.containsEsc && this.unexpected(a);
	var s = this.regexpState ||= new X(this);
	s.reset(n, i, o), this.validateRegExpFlags(s), this.validateRegExpPattern(s);
	var c = null;
	try {
		c = new RegExp(i, o);
	} catch {}
	return this.finishToken(D.regexp, {
		pattern: i,
		flags: o,
		value: c
	});
}, $.readInt = function(e, t, n) {
	for (var r = this.options.ecmaVersion >= 12 && t === void 0, i = n && this.input.charCodeAt(this.pos) === 48, a = this.pos, o = 0, s = 0, c = 0, l = t ?? Infinity; c < l; ++c, ++this.pos) {
		var u = this.input.charCodeAt(this.pos), d = void 0;
		if (r && u === 95) {
			i && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), s === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), c === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), s = u;
			continue;
		}
		if (d = u >= 97 ? u - 97 + 10 : u >= 65 ? u - 65 + 10 : u >= 48 && u <= 57 ? u - 48 : Infinity, d >= e) break;
		s = u, o = o * e + d;
	}
	return r && s === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === a || t != null && this.pos - a !== t ? null : o;
};
function zt(e, t) {
	return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
}
function Bt(e) {
	return typeof BigInt == "function" ? BigInt(e.replace(/_/g, "")) : null;
}
$.readRadixNumber = function(e) {
	var t = this.pos;
	this.pos += 2;
	var n = this.readInt(e);
	return n ?? this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = Bt(this.input.slice(t, this.pos)), ++this.pos) : x(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(D.num, n);
}, $.readNumber = function(e) {
	var t = this.pos;
	!e && this.readInt(10, void 0, !0) === null && this.raise(t, "Invalid number");
	var n = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
	n && this.strict && this.raise(t, "Invalid number");
	var r = this.input.charCodeAt(this.pos);
	if (!n && !e && this.options.ecmaVersion >= 11 && r === 110) {
		var i = Bt(this.input.slice(t, this.pos));
		return ++this.pos, x(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(D.num, i);
	}
	n && /[89]/.test(this.input.slice(t, this.pos)) && (n = !1), r === 46 && !n && (++this.pos, this.readInt(10), r = this.input.charCodeAt(this.pos)), (r === 69 || r === 101) && !n && (r = this.input.charCodeAt(++this.pos), (r === 43 || r === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, "Invalid number")), x(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
	var a = zt(this.input.slice(t, this.pos), n);
	return this.finishToken(D.num, a);
}, $.readCodePoint = function() {
	var e = this.input.charCodeAt(this.pos), t;
	if (e === 123) {
		this.options.ecmaVersion < 6 && this.unexpected();
		var n = ++this.pos;
		t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(n, "Code point out of bounds");
	} else t = this.readHexChar(4);
	return t;
}, $.readString = function(e) {
	for (var t = "", n = ++this.pos;;) {
		this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
		var r = this.input.charCodeAt(this.pos);
		if (r === e) break;
		r === 92 ? (t += this.input.slice(n, this.pos), t += this.readEscapedChar(!1), n = this.pos) : r === 8232 || r === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (oe(r) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
	}
	return t += this.input.slice(n, this.pos++), this.finishToken(D.string, t);
};
var Vt = {};
$.tryReadTemplateToken = function() {
	this.inTemplateElement = !0;
	try {
		this.readTmplToken();
	} catch (e) {
		if (e === Vt) this.readInvalidTemplateToken();
		else throw e;
	}
	this.inTemplateElement = !1;
}, $.invalidStringToken = function(e, t) {
	if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw Vt;
	this.raise(e, t);
}, $.readTmplToken = function() {
	for (var e = "", t = this.pos;;) {
		this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
		var n = this.input.charCodeAt(this.pos);
		if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123) return this.pos === this.start && (this.type === D.template || this.type === D.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(D.dollarBraceL)) : (++this.pos, this.finishToken(D.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(D.template, e));
		if (n === 92) e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
		else if (oe(n)) {
			switch (e += this.input.slice(t, this.pos), ++this.pos, n) {
				case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
				case 10:
					e += "\n";
					break;
				default:
					e += String.fromCharCode(n);
					break;
			}
			this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
		} else ++this.pos;
	}
}, $.readInvalidTemplateToken = function() {
	for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
		case "\\":
			++this.pos;
			break;
		case "$": if (this.input[this.pos + 1] !== "{") break;
		case "`": return this.finishToken(D.invalidTemplate, this.input.slice(this.start, this.pos));
		case "\r": this.input[this.pos + 1] === "\n" && ++this.pos;
		case "\n":
		case "\u2028":
		case "\u2029":
			++this.curLine, this.lineStart = this.pos + 1;
			break;
	}
	this.raise(this.start, "Unterminated template");
}, $.readEscapedChar = function(e) {
	var t = this.input.charCodeAt(++this.pos);
	switch (++this.pos, t) {
		case 110: return "\n";
		case 114: return "\r";
		case 120: return String.fromCharCode(this.readHexChar(2));
		case 117: return he(this.readCodePoint());
		case 116: return "	";
		case 98: return "\b";
		case 118: return "\v";
		case 102: return "\f";
		case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
		case 10: return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
		case 56:
		case 57: if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"), e) {
			var n = this.pos - 1;
			this.invalidStringToken(n, "Invalid escape sequence in template string");
		}
		default:
			if (t >= 48 && t <= 55) {
				var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], i = parseInt(r, 8);
				return i > 255 && (r = r.slice(0, -1), i = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(this.pos), (r !== "0" || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(this.pos - 1 - r.length, e ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(i);
			}
			return oe(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(t);
	}
}, $.readHexChar = function(e) {
	var t = this.pos, n = this.readInt(16, e);
	return n === null && this.invalidStringToken(t, "Bad character escape sequence"), n;
}, $.readWord1 = function() {
	this.containsEsc = !1;
	for (var e = "", t = !0, n = this.pos, r = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {
		var i = this.fullCharCodeAtPos();
		if (re(i, r)) this.pos += i <= 65535 ? 1 : 2;
		else if (i === 92) {
			this.containsEsc = !0, e += this.input.slice(n, this.pos);
			var a = this.pos;
			this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
			var o = this.readCodePoint();
			(t ? x : re)(o, r) || this.invalidStringToken(a, "Invalid Unicode escape"), e += he(o), n = this.pos;
		} else break;
		t = !1;
	}
	return e + this.input.slice(n, this.pos);
}, $.readWord = function() {
	var e = this.readWord1(), t = D.name;
	return this.keywords.test(e) && (t = ie[e]), this.finishToken(t, e);
}, I.acorn = {
	Parser: I,
	version: "8.17.0",
	defaultOptions: be,
	Position: _e,
	SourceLocation: ve,
	getLineInfo: ye,
	Node: Qe,
	TokenType: S,
	tokTypes: D,
	keywordTypes: ie,
	TokContext: W,
	tokContexts: G,
	isIdentifierChar: re,
	isIdentifierStart: x,
	Token: Rt,
	isNewLine: oe,
	lineBreak: O,
	lineBreakG: ae,
	nonASCIIwhitespace: ce
};
//#endregion
//#region node_modules/acorn-jsx/xhtml.js
var Ht = /* @__PURE__ */ u(((e, t) => {
	t.exports = {
		quot: "\"",
		amp: "&",
		apos: "'",
		lt: "<",
		gt: ">",
		nbsp: "\xA0",
		iexcl: "¡",
		cent: "¢",
		pound: "£",
		curren: "¤",
		yen: "¥",
		brvbar: "¦",
		sect: "§",
		uml: "¨",
		copy: "©",
		ordf: "ª",
		laquo: "«",
		not: "¬",
		shy: "­",
		reg: "®",
		macr: "¯",
		deg: "°",
		plusmn: "±",
		sup2: "²",
		sup3: "³",
		acute: "´",
		micro: "µ",
		para: "¶",
		middot: "·",
		cedil: "¸",
		sup1: "¹",
		ordm: "º",
		raquo: "»",
		frac14: "¼",
		frac12: "½",
		frac34: "¾",
		iquest: "¿",
		Agrave: "À",
		Aacute: "Á",
		Acirc: "Â",
		Atilde: "Ã",
		Auml: "Ä",
		Aring: "Å",
		AElig: "Æ",
		Ccedil: "Ç",
		Egrave: "È",
		Eacute: "É",
		Ecirc: "Ê",
		Euml: "Ë",
		Igrave: "Ì",
		Iacute: "Í",
		Icirc: "Î",
		Iuml: "Ï",
		ETH: "Ð",
		Ntilde: "Ñ",
		Ograve: "Ò",
		Oacute: "Ó",
		Ocirc: "Ô",
		Otilde: "Õ",
		Ouml: "Ö",
		times: "×",
		Oslash: "Ø",
		Ugrave: "Ù",
		Uacute: "Ú",
		Ucirc: "Û",
		Uuml: "Ü",
		Yacute: "Ý",
		THORN: "Þ",
		szlig: "ß",
		agrave: "à",
		aacute: "á",
		acirc: "â",
		atilde: "ã",
		auml: "ä",
		aring: "å",
		aelig: "æ",
		ccedil: "ç",
		egrave: "è",
		eacute: "é",
		ecirc: "ê",
		euml: "ë",
		igrave: "ì",
		iacute: "í",
		icirc: "î",
		iuml: "ï",
		eth: "ð",
		ntilde: "ñ",
		ograve: "ò",
		oacute: "ó",
		ocirc: "ô",
		otilde: "õ",
		ouml: "ö",
		divide: "÷",
		oslash: "ø",
		ugrave: "ù",
		uacute: "ú",
		ucirc: "û",
		uuml: "ü",
		yacute: "ý",
		thorn: "þ",
		yuml: "ÿ",
		OElig: "Œ",
		oelig: "œ",
		Scaron: "Š",
		scaron: "š",
		Yuml: "Ÿ",
		fnof: "ƒ",
		circ: "ˆ",
		tilde: "˜",
		Alpha: "Α",
		Beta: "Β",
		Gamma: "Γ",
		Delta: "Δ",
		Epsilon: "Ε",
		Zeta: "Ζ",
		Eta: "Η",
		Theta: "Θ",
		Iota: "Ι",
		Kappa: "Κ",
		Lambda: "Λ",
		Mu: "Μ",
		Nu: "Ν",
		Xi: "Ξ",
		Omicron: "Ο",
		Pi: "Π",
		Rho: "Ρ",
		Sigma: "Σ",
		Tau: "Τ",
		Upsilon: "Υ",
		Phi: "Φ",
		Chi: "Χ",
		Psi: "Ψ",
		Omega: "Ω",
		alpha: "α",
		beta: "β",
		gamma: "γ",
		delta: "δ",
		epsilon: "ε",
		zeta: "ζ",
		eta: "η",
		theta: "θ",
		iota: "ι",
		kappa: "κ",
		lambda: "λ",
		mu: "μ",
		nu: "ν",
		xi: "ξ",
		omicron: "ο",
		pi: "π",
		rho: "ρ",
		sigmaf: "ς",
		sigma: "σ",
		tau: "τ",
		upsilon: "υ",
		phi: "φ",
		chi: "χ",
		psi: "ψ",
		omega: "ω",
		thetasym: "ϑ",
		upsih: "ϒ",
		piv: "ϖ",
		ensp: " ",
		emsp: " ",
		thinsp: " ",
		zwnj: "‌",
		zwj: "‍",
		lrm: "‎",
		rlm: "‏",
		ndash: "–",
		mdash: "—",
		lsquo: "‘",
		rsquo: "’",
		sbquo: "‚",
		ldquo: "“",
		rdquo: "”",
		bdquo: "„",
		dagger: "†",
		Dagger: "‡",
		bull: "•",
		hellip: "…",
		permil: "‰",
		prime: "′",
		Prime: "″",
		lsaquo: "‹",
		rsaquo: "›",
		oline: "‾",
		frasl: "⁄",
		euro: "€",
		image: "ℑ",
		weierp: "℘",
		real: "ℜ",
		trade: "™",
		alefsym: "ℵ",
		larr: "←",
		uarr: "↑",
		rarr: "→",
		darr: "↓",
		harr: "↔",
		crarr: "↵",
		lArr: "⇐",
		uArr: "⇑",
		rArr: "⇒",
		dArr: "⇓",
		hArr: "⇔",
		forall: "∀",
		part: "∂",
		exist: "∃",
		empty: "∅",
		nabla: "∇",
		isin: "∈",
		notin: "∉",
		ni: "∋",
		prod: "∏",
		sum: "∑",
		minus: "−",
		lowast: "∗",
		radic: "√",
		prop: "∝",
		infin: "∞",
		ang: "∠",
		and: "∧",
		or: "∨",
		cap: "∩",
		cup: "∪",
		int: "∫",
		there4: "∴",
		sim: "∼",
		cong: "≅",
		asymp: "≈",
		ne: "≠",
		equiv: "≡",
		le: "≤",
		ge: "≥",
		sub: "⊂",
		sup: "⊃",
		nsub: "⊄",
		sube: "⊆",
		supe: "⊇",
		oplus: "⊕",
		otimes: "⊗",
		perp: "⊥",
		sdot: "⋅",
		lceil: "⌈",
		rceil: "⌉",
		lfloor: "⌊",
		rfloor: "⌋",
		lang: "〈",
		rang: "〉",
		loz: "◊",
		spades: "♠",
		clubs: "♣",
		hearts: "♥",
		diams: "♦"
	};
})), Ut = /* @__PURE__ */ u(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : (n = typeof globalThis < "u" ? globalThis : n || self, r(n.acorn = {}));
	})(e, (function(e) {
		var t = [
			509,
			0,
			227,
			0,
			150,
			4,
			294,
			9,
			1368,
			2,
			2,
			1,
			6,
			3,
			41,
			2,
			5,
			0,
			166,
			1,
			574,
			3,
			9,
			9,
			7,
			9,
			32,
			4,
			318,
			1,
			78,
			5,
			71,
			10,
			50,
			3,
			123,
			2,
			54,
			14,
			32,
			10,
			3,
			1,
			11,
			3,
			46,
			10,
			8,
			0,
			46,
			9,
			7,
			2,
			37,
			13,
			2,
			9,
			6,
			1,
			45,
			0,
			13,
			2,
			49,
			13,
			9,
			3,
			2,
			11,
			83,
			11,
			7,
			0,
			3,
			0,
			158,
			11,
			6,
			9,
			7,
			3,
			56,
			1,
			2,
			6,
			3,
			1,
			3,
			2,
			10,
			0,
			11,
			1,
			3,
			6,
			4,
			4,
			68,
			8,
			2,
			0,
			3,
			0,
			2,
			3,
			2,
			4,
			2,
			0,
			15,
			1,
			83,
			17,
			10,
			9,
			5,
			0,
			82,
			19,
			13,
			9,
			214,
			6,
			3,
			8,
			28,
			1,
			83,
			16,
			16,
			9,
			82,
			12,
			9,
			9,
			7,
			19,
			58,
			14,
			5,
			9,
			243,
			14,
			166,
			9,
			71,
			5,
			2,
			1,
			3,
			3,
			2,
			0,
			2,
			1,
			13,
			9,
			120,
			6,
			3,
			6,
			4,
			0,
			29,
			9,
			41,
			6,
			2,
			3,
			9,
			0,
			10,
			10,
			47,
			15,
			199,
			7,
			137,
			9,
			54,
			7,
			2,
			7,
			17,
			9,
			57,
			21,
			2,
			13,
			123,
			5,
			4,
			0,
			2,
			1,
			2,
			6,
			2,
			0,
			9,
			9,
			49,
			4,
			2,
			1,
			2,
			4,
			9,
			9,
			55,
			9,
			266,
			3,
			10,
			1,
			2,
			0,
			49,
			6,
			4,
			4,
			14,
			10,
			5350,
			0,
			7,
			14,
			11465,
			27,
			2343,
			9,
			87,
			9,
			39,
			4,
			60,
			6,
			26,
			9,
			535,
			9,
			470,
			0,
			2,
			54,
			8,
			3,
			82,
			0,
			12,
			1,
			19628,
			1,
			4178,
			9,
			519,
			45,
			3,
			22,
			543,
			4,
			4,
			5,
			9,
			7,
			3,
			6,
			31,
			3,
			149,
			2,
			1418,
			49,
			513,
			54,
			5,
			49,
			9,
			0,
			15,
			0,
			23,
			4,
			2,
			14,
			1361,
			6,
			2,
			16,
			3,
			6,
			2,
			1,
			2,
			4,
			101,
			0,
			161,
			6,
			10,
			9,
			357,
			0,
			62,
			13,
			499,
			13,
			245,
			1,
			2,
			9,
			233,
			0,
			3,
			0,
			8,
			1,
			6,
			0,
			475,
			6,
			110,
			6,
			6,
			9,
			4759,
			9,
			787719,
			239
		], n = [
			0,
			11,
			2,
			25,
			2,
			18,
			2,
			1,
			2,
			14,
			3,
			13,
			35,
			122,
			70,
			52,
			268,
			28,
			4,
			48,
			48,
			31,
			14,
			29,
			6,
			37,
			11,
			29,
			3,
			35,
			5,
			7,
			2,
			4,
			43,
			157,
			19,
			35,
			5,
			35,
			5,
			39,
			9,
			51,
			13,
			10,
			2,
			14,
			2,
			6,
			2,
			1,
			2,
			10,
			2,
			14,
			2,
			6,
			2,
			1,
			4,
			51,
			13,
			310,
			10,
			21,
			11,
			7,
			25,
			5,
			2,
			41,
			2,
			8,
			70,
			5,
			3,
			0,
			2,
			43,
			2,
			1,
			4,
			0,
			3,
			22,
			11,
			22,
			10,
			30,
			66,
			18,
			2,
			1,
			11,
			21,
			11,
			25,
			7,
			25,
			39,
			55,
			7,
			1,
			65,
			0,
			16,
			3,
			2,
			2,
			2,
			28,
			43,
			28,
			4,
			28,
			36,
			7,
			2,
			27,
			28,
			53,
			11,
			21,
			11,
			18,
			14,
			17,
			111,
			72,
			56,
			50,
			14,
			50,
			14,
			35,
			39,
			27,
			10,
			22,
			251,
			41,
			7,
			1,
			17,
			5,
			57,
			28,
			11,
			0,
			9,
			21,
			43,
			17,
			47,
			20,
			28,
			22,
			13,
			52,
			58,
			1,
			3,
			0,
			14,
			44,
			33,
			24,
			27,
			35,
			30,
			0,
			3,
			0,
			9,
			34,
			4,
			0,
			13,
			47,
			15,
			3,
			22,
			0,
			2,
			0,
			36,
			17,
			2,
			24,
			20,
			1,
			64,
			6,
			2,
			0,
			2,
			3,
			2,
			14,
			2,
			9,
			8,
			46,
			39,
			7,
			3,
			1,
			3,
			21,
			2,
			6,
			2,
			1,
			2,
			4,
			4,
			0,
			19,
			0,
			13,
			4,
			31,
			9,
			2,
			0,
			3,
			0,
			2,
			37,
			2,
			0,
			26,
			0,
			2,
			0,
			45,
			52,
			19,
			3,
			21,
			2,
			31,
			47,
			21,
			1,
			2,
			0,
			185,
			46,
			42,
			3,
			37,
			47,
			21,
			0,
			60,
			42,
			14,
			0,
			72,
			26,
			38,
			6,
			186,
			43,
			117,
			63,
			32,
			7,
			3,
			0,
			3,
			7,
			2,
			1,
			2,
			23,
			16,
			0,
			2,
			0,
			95,
			7,
			3,
			38,
			17,
			0,
			2,
			0,
			29,
			0,
			11,
			39,
			8,
			0,
			22,
			0,
			12,
			45,
			20,
			0,
			19,
			72,
			200,
			32,
			32,
			8,
			2,
			36,
			18,
			0,
			50,
			29,
			113,
			6,
			2,
			1,
			2,
			37,
			22,
			0,
			26,
			5,
			2,
			1,
			2,
			31,
			15,
			0,
			24,
			43,
			261,
			18,
			16,
			0,
			2,
			12,
			2,
			33,
			125,
			0,
			80,
			921,
			103,
			110,
			18,
			195,
			2637,
			96,
			16,
			1071,
			18,
			5,
			26,
			3994,
			6,
			582,
			6842,
			29,
			1763,
			568,
			8,
			30,
			18,
			78,
			18,
			29,
			19,
			47,
			17,
			3,
			32,
			20,
			6,
			18,
			433,
			44,
			212,
			63,
			33,
			24,
			3,
			24,
			45,
			74,
			6,
			0,
			67,
			12,
			65,
			1,
			2,
			0,
			15,
			4,
			10,
			7381,
			42,
			31,
			98,
			114,
			8702,
			3,
			2,
			6,
			2,
			1,
			2,
			290,
			16,
			0,
			30,
			2,
			3,
			0,
			15,
			3,
			9,
			395,
			2309,
			106,
			6,
			12,
			4,
			8,
			8,
			9,
			5991,
			84,
			2,
			70,
			2,
			1,
			3,
			0,
			3,
			1,
			3,
			3,
			2,
			11,
			2,
			0,
			2,
			6,
			2,
			64,
			2,
			3,
			3,
			7,
			2,
			6,
			2,
			27,
			2,
			3,
			2,
			4,
			2,
			0,
			4,
			6,
			2,
			339,
			3,
			24,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			7,
			1845,
			30,
			7,
			5,
			262,
			61,
			147,
			44,
			11,
			6,
			17,
			0,
			322,
			29,
			19,
			43,
			485,
			27,
			229,
			29,
			3,
			0,
			208,
			30,
			2,
			2,
			2,
			1,
			2,
			6,
			3,
			4,
			10,
			1,
			225,
			6,
			2,
			3,
			2,
			1,
			2,
			14,
			2,
			196,
			60,
			67,
			8,
			0,
			1205,
			3,
			2,
			26,
			2,
			1,
			2,
			0,
			3,
			0,
			2,
			9,
			2,
			3,
			2,
			0,
			2,
			0,
			7,
			0,
			5,
			0,
			2,
			0,
			2,
			0,
			2,
			2,
			2,
			1,
			2,
			0,
			3,
			0,
			2,
			0,
			2,
			0,
			2,
			0,
			2,
			0,
			2,
			1,
			2,
			0,
			3,
			3,
			2,
			6,
			2,
			3,
			2,
			3,
			2,
			0,
			2,
			9,
			2,
			16,
			6,
			2,
			2,
			4,
			2,
			16,
			4421,
			42719,
			33,
			4381,
			3,
			5773,
			3,
			7472,
			16,
			621,
			2467,
			541,
			1507,
			4938,
			6,
			8489
		], r = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-᫝᫠-᫫ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", i = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-࢏ࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚ౜ౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ೜-ೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-Ƛ꟱-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", a = {
			3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
			5: "class enum extends super const export import",
			6: "enum",
			strict: "implements interface let package private protected public static yield",
			strictBind: "eval arguments"
		}, o = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", s = {
			5: o,
			"5module": o + " export import",
			6: o + " const class extends export import super"
		}, c = /^in(stanceof)?$/, l = RegExp("[" + i + "]"), u = RegExp("[" + i + r + "]");
		function d(e, t) {
			for (var n = 65536, r = 0; r < t.length; r += 2) {
				if (n += t[r], n > e) return !1;
				if (n += t[r + 1], n >= e) return !0;
			}
			return !1;
		}
		function f(e, t) {
			return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && l.test(String.fromCharCode(e)) : t === !1 ? !1 : d(e, n);
		}
		function p(e, r) {
			return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && u.test(String.fromCharCode(e)) : r === !1 ? !1 : d(e, n) || d(e, t);
		}
		var m = function(e, t) {
			t === void 0 && (t = {}), this.label = e, this.keyword = t.keyword, this.beforeExpr = !!t.beforeExpr, this.startsExpr = !!t.startsExpr, this.isLoop = !!t.isLoop, this.isAssign = !!t.isAssign, this.prefix = !!t.prefix, this.postfix = !!t.postfix, this.binop = t.binop || null, this.updateContext = null;
		};
		function h(e, t) {
			return new m(e, {
				beforeExpr: !0,
				binop: t
			});
		}
		var g = { beforeExpr: !0 }, _ = { startsExpr: !0 }, ee = {};
		function v(e, t) {
			return t === void 0 && (t = {}), t.keyword = e, ee[e] = new m(e, t);
		}
		var y = {
			num: new m("num", _),
			regexp: new m("regexp", _),
			string: new m("string", _),
			name: new m("name", _),
			privateId: new m("privateId", _),
			eof: new m("eof"),
			bracketL: new m("[", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			bracketR: new m("]"),
			braceL: new m("{", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			braceR: new m("}"),
			parenL: new m("(", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			parenR: new m(")"),
			comma: new m(",", g),
			semi: new m(";", g),
			colon: new m(":", g),
			dot: new m("."),
			question: new m("?", g),
			questionDot: new m("?."),
			arrow: new m("=>", g),
			template: new m("template"),
			invalidTemplate: new m("invalidTemplate"),
			ellipsis: new m("...", g),
			backQuote: new m("`", _),
			dollarBraceL: new m("${", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			eq: new m("=", {
				beforeExpr: !0,
				isAssign: !0
			}),
			assign: new m("_=", {
				beforeExpr: !0,
				isAssign: !0
			}),
			incDec: new m("++/--", {
				prefix: !0,
				postfix: !0,
				startsExpr: !0
			}),
			prefix: new m("!/~", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			}),
			logicalOR: h("||", 1),
			logicalAND: h("&&", 2),
			bitwiseOR: h("|", 3),
			bitwiseXOR: h("^", 4),
			bitwiseAND: h("&", 5),
			equality: h("==/!=/===/!==", 6),
			relational: h("</>/<=/>=", 7),
			bitShift: h("<</>>/>>>", 8),
			plusMin: new m("+/-", {
				beforeExpr: !0,
				binop: 9,
				prefix: !0,
				startsExpr: !0
			}),
			modulo: h("%", 10),
			star: h("*", 10),
			slash: h("/", 10),
			starstar: new m("**", { beforeExpr: !0 }),
			coalesce: h("??", 1),
			_break: v("break"),
			_case: v("case", g),
			_catch: v("catch"),
			_continue: v("continue"),
			_debugger: v("debugger"),
			_default: v("default", g),
			_do: v("do", {
				isLoop: !0,
				beforeExpr: !0
			}),
			_else: v("else", g),
			_finally: v("finally"),
			_for: v("for", { isLoop: !0 }),
			_function: v("function", _),
			_if: v("if"),
			_return: v("return", g),
			_switch: v("switch"),
			_throw: v("throw", g),
			_try: v("try"),
			_var: v("var"),
			_const: v("const"),
			_while: v("while", { isLoop: !0 }),
			_with: v("with"),
			_new: v("new", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			_this: v("this", _),
			_super: v("super", _),
			_class: v("class", _),
			_extends: v("extends", g),
			_export: v("export"),
			_import: v("import", _),
			_null: v("null", _),
			_true: v("true", _),
			_false: v("false", _),
			_in: v("in", {
				beforeExpr: !0,
				binop: 7
			}),
			_instanceof: v("instanceof", {
				beforeExpr: !0,
				binop: 7
			}),
			_typeof: v("typeof", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			}),
			_void: v("void", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			}),
			_delete: v("delete", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			})
		}, b = /\r\n?|\n|\u2028|\u2029/, te = new RegExp(b.source, "g");
		function ne(e) {
			return e === 10 || e === 13 || e === 8232 || e === 8233;
		}
		function x(e, t, n) {
			n === void 0 && (n = e.length);
			for (var r = t; r < n; r++) {
				var i = e.charCodeAt(r);
				if (ne(i)) return r < n - 1 && i === 13 && e.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
			}
			return -1;
		}
		var re = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, S = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, C = Object.prototype, w = C.hasOwnProperty, T = C.toString, ie = Object.hasOwn || (function(e, t) {
			return w.call(e, t);
		}), E = Array.isArray || (function(e) {
			return T.call(e) === "[object Array]";
		}), D = Object.create(null);
		function O(e) {
			return D[e] || (D[e] = RegExp("^(?:" + e.replace(/ /g, "|") + ")$"));
		}
		function ae(e) {
			return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
		}
		var oe = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, se = function(e, t) {
			this.line = e, this.column = t;
		};
		se.prototype.offset = function(e) {
			return new se(this.line, this.column + e);
		};
		var ce = function(e, t, n) {
			this.start = t, this.end = n, e.sourceFile !== null && (this.source = e.sourceFile);
		};
		function k(e, t) {
			for (var n = 1, r = 0;;) {
				var i = x(e, r, t);
				if (i < 0) return new se(n, t - r);
				++n, r = i;
			}
		}
		var le = {
			ecmaVersion: null,
			sourceType: "script",
			strict: !1,
			onInsertedSemicolon: null,
			onTrailingComma: null,
			allowReserved: null,
			allowReturnOutsideFunction: !1,
			allowImportExportEverywhere: !1,
			allowAwaitOutsideFunction: null,
			allowSuperOutsideMethod: null,
			allowHashBang: !1,
			checkPrivateFields: !0,
			locations: !1,
			onToken: null,
			onComment: null,
			ranges: !1,
			program: null,
			sourceFile: null,
			directSourceFile: null,
			preserveParens: !1
		}, ue = !1;
		function de(e) {
			var t = {};
			for (var n in le) t[n] = e && ie(e, n) ? e[n] : le[n];
			if (t.ecmaVersion === "latest" ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!ue && typeof console == "object" && console.warn && (ue = !0, console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved ??= t.ecmaVersion < 5, (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), E(t.onToken)) {
				var r = t.onToken;
				t.onToken = function(e) {
					return r.push(e);
				};
			}
			if (E(t.onComment) && (t.onComment = fe(t, t.onComment)), t.sourceType === "commonjs" && t.allowAwaitOutsideFunction) throw Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");
			return t;
		}
		function fe(e, t) {
			return function(n, r, i, a, o, s) {
				var c = {
					type: n ? "Block" : "Line",
					value: r,
					start: i,
					end: a
				};
				e.locations && (c.loc = new ce(this, o, s)), e.ranges && (c.range = [i, a]), t.push(c);
			};
		}
		var pe = 1, me = 2, A = 4, he = 8, ge = 16, _e = 32, ve = 64, ye = 128, be = 256, xe = 512, Se = 1024, Ce = pe | me | be;
		function we(e, t) {
			return me | (e ? A : 0) | (t ? he : 0);
		}
		var Te = 0, Ee = 1, j = 2, De = 3, Oe = 4, ke = 5, M = function(e, t, n) {
			this.options = e = de(e), this.sourceFile = e.sourceFile, this.keywords = O(s[e.ecmaVersion >= 6 ? 6 : e.sourceType === "module" ? "5module" : 5]);
			var r = "";
			e.allowReserved !== !0 && (r = a[e.ecmaVersion >= 6 ? 6 : e.ecmaVersion === 5 ? 5 : 3], e.sourceType === "module" && (r += " await")), this.reservedWords = O(r);
			var i = (r ? r + " " : "") + a.strict;
			this.reservedWordsStrict = O(i), this.reservedWordsStrictBind = O(i + " " + a.strictBind), this.input = String(t), this.containsEsc = !1, n ? (this.pos = n, this.lineStart = this.input.lastIndexOf("\n", n - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(b).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = y.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = e.sourceType === "module", this.strict = this.inModule || e.strict === !0 || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), this.pos === 0 && e.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(this.options.sourceType === "commonjs" ? me : pe), this.regexpState = null, this.privateNameStack = [];
		}, N = {
			inFunction: { configurable: !0 },
			inGenerator: { configurable: !0 },
			inAsync: { configurable: !0 },
			canAwait: { configurable: !0 },
			allowReturn: { configurable: !0 },
			allowSuper: { configurable: !0 },
			allowDirectSuper: { configurable: !0 },
			treatFunctionsAsVar: { configurable: !0 },
			allowNewDotTarget: { configurable: !0 },
			allowUsing: { configurable: !0 },
			inClassStaticBlock: { configurable: !0 }
		};
		M.prototype.parse = function() {
			var e = this, t = this.options.program || this.startNode();
			return this.nextToken(), this.catchStackOverflow(function() {
				return e.parseTopLevel(t);
			});
		}, N.inFunction.get = function() {
			return (this.currentVarScope().flags & me) > 0;
		}, N.inGenerator.get = function() {
			return (this.currentVarScope().flags & he) > 0;
		}, N.inAsync.get = function() {
			return (this.currentVarScope().flags & A) > 0;
		}, N.canAwait.get = function() {
			for (var e = this.scopeStack.length - 1; e >= 0; e--) {
				var t = this.scopeStack[e].flags;
				if (t & (be | xe)) return !1;
				if (t & me) return (t & A) > 0;
			}
			return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
		}, N.allowReturn.get = function() {
			return !!(this.inFunction || this.options.allowReturnOutsideFunction && this.currentVarScope().flags & pe);
		}, N.allowSuper.get = function() {
			return (this.currentThisScope().flags & ve) > 0 || this.options.allowSuperOutsideMethod;
		}, N.allowDirectSuper.get = function() {
			return (this.currentThisScope().flags & ye) > 0;
		}, N.treatFunctionsAsVar.get = function() {
			return this.treatFunctionsAsVarInScope(this.currentScope());
		}, N.allowNewDotTarget.get = function() {
			for (var e = this.scopeStack.length - 1; e >= 0; e--) {
				var t = this.scopeStack[e].flags;
				if (t & (be | xe) || t & me && !(t & ge)) return !0;
			}
			return !1;
		}, N.allowUsing.get = function() {
			var e = this.currentScope().flags;
			return !(e & Se || !this.inModule && e & pe);
		}, N.inClassStaticBlock.get = function() {
			return (this.currentVarScope().flags & be) > 0;
		}, M.extend = function() {
			for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
			for (var n = this, r = 0; r < e.length; r++) n = e[r](n);
			return n;
		}, M.parse = function(e, t) {
			return new this(t, e).parse();
		}, M.parseExpressionAt = function(e, t, n) {
			var r = new this(n, e, t);
			return r.nextToken(), r.parseExpression();
		}, M.tokenizer = function(e, t) {
			return new this(t, e);
		}, Object.defineProperties(M.prototype, N);
		var P = M.prototype, Ae = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
		P.strictDirective = function(e) {
			if (this.options.ecmaVersion < 5) return !1;
			for (;;) {
				S.lastIndex = e, e += S.exec(this.input)[0].length;
				var t = Ae.exec(this.input.slice(e));
				if (!t) return !1;
				if ((t[1] || t[2]) === "use strict") {
					S.lastIndex = e + t[0].length;
					var n = S.exec(this.input), r = n.index + n[0].length, i = this.input.charAt(r);
					return i === ";" || i === "}" || b.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(i) || i === "!" && this.input.charAt(r + 1) === "=");
				}
				e += t[0].length, S.lastIndex = e, e += S.exec(this.input)[0].length, this.input[e] === ";" && e++;
			}
		}, P.eat = function(e) {
			return this.type === e ? (this.next(), !0) : !1;
		}, P.isContextual = function(e) {
			return this.type === y.name && this.value === e && !this.containsEsc;
		}, P.eatContextual = function(e) {
			return this.isContextual(e) ? (this.next(), !0) : !1;
		}, P.catchStackOverflow = function(e) {
			try {
				return e();
			} catch (e) {
				if (e instanceof Error && (/\bstack\b.*\b(exceeded|overflow)\b/i.test(e.message) || /\btoo much recursion\b/i.test(e.message))) this.raise(this.start, "Not enough stack space to parse input");
				else throw e;
			}
		}, P.expectContextual = function(e) {
			this.eatContextual(e) || this.unexpected();
		}, P.canInsertSemicolon = function() {
			return this.type === y.eof || this.type === y.braceR || b.test(this.input.slice(this.lastTokEnd, this.start));
		}, P.insertSemicolon = function() {
			if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
		}, P.semicolon = function() {
			!this.eat(y.semi) && !this.insertSemicolon() && this.unexpected();
		}, P.afterTrailingComma = function(e, t) {
			if (this.type === e) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
		}, P.expect = function(e) {
			this.eat(e) || this.unexpected();
		}, P.unexpected = function(e) {
			this.raise(e ?? this.start, "Unexpected token");
		};
		var je = function() {
			this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
		};
		P.checkPatternErrors = function(e, t) {
			if (e) {
				e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
				var n = t ? e.parenthesizedAssign : e.parenthesizedBind;
				n > -1 && this.raiseRecoverable(n, t ? "Assigning to rvalue" : "Parenthesized pattern");
			}
		}, P.checkExpressionErrors = function(e, t) {
			if (!e) return !1;
			var n = e.shorthandAssign, r = e.doubleProto;
			if (!t) return n >= 0 || r >= 0;
			n >= 0 && this.raise(n, "Shorthand property assignments are valid only in destructuring patterns"), r >= 0 && this.raiseRecoverable(r, "Redefinition of __proto__ property");
		}, P.checkYieldAwaitInDefaultParams = function() {
			this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
		}, P.isSimpleAssignTarget = function(e) {
			return e.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(e.expression) : e.type === "Identifier" || e.type === "MemberExpression";
		};
		var F = M.prototype;
		F.parseTopLevel = function(e) {
			var t = Object.create(null);
			for (e.body ||= []; this.type !== y.eof;) {
				var n = this.parseStatement(null, !0, t);
				e.body.push(n);
			}
			if (this.inModule) for (var r = 0, i = Object.keys(this.undefinedExports); r < i.length; r += 1) {
				var a = i[r];
				this.raiseRecoverable(this.undefinedExports[a].start, "Export '" + a + "' is not defined");
			}
			return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType === "commonjs" ? "script" : this.options.sourceType, this.finishNode(e, "Program");
		};
		var Me = { kind: "loop" }, Ne = { kind: "switch" };
		F.isLet = function(e) {
			if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
			S.lastIndex = this.pos;
			var t = S.exec(this.input), n = this.pos + t[0].length, r = this.fullCharCodeAt(n);
			if (r === 91 || r === 92) return !0;
			if (e) return !1;
			if (r === 123) return !0;
			if (f(r)) {
				var i = n;
				do
					n += r <= 65535 ? 1 : 2;
				while (p(r = this.fullCharCodeAt(n)));
				if (r === 92) return !0;
				var a = this.input.slice(i, n);
				if (!c.test(a)) return !0;
			}
			return !1;
		}, F.isAsyncFunction = function() {
			if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
			S.lastIndex = this.pos;
			var e = S.exec(this.input), t = this.pos + e[0].length, n;
			return !b.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !(p(n = this.fullCharCodeAt(t + 8)) || n === 92));
		}, F.isUsingKeyword = function(e, t) {
			if (this.options.ecmaVersion < 17 || !this.isContextual(e ? "await" : "using")) return !1;
			S.lastIndex = this.pos;
			var n = S.exec(this.input), r = this.pos + n[0].length;
			if (b.test(this.input.slice(this.pos, r))) return !1;
			if (e) {
				var i = r + 5, a;
				if (this.input.slice(r, i) !== "using" || i === this.input.length || p(a = this.fullCharCodeAt(i)) || a === 92) return !1;
				S.lastIndex = i;
				var o = S.exec(this.input);
				if (r = i + o[0].length, o && b.test(this.input.slice(i, r))) return !1;
			}
			var s = this.fullCharCodeAt(r);
			if (!f(s) && s !== 92) return !1;
			var l = r;
			do
				r += s <= 65535 ? 1 : 2;
			while (p(s = this.fullCharCodeAt(r)));
			if (s === 92) return !0;
			var u = this.input.slice(l, r);
			if (c.test(u)) return !1;
			if (t && !e && u === "of") {
				S.lastIndex = r;
				var d = S.exec(this.input);
				if (r += d[0].length, this.input.charCodeAt(r) !== 61 || (s = this.input.charCodeAt(r + 1)) === 61 || s === 62) return !1;
			}
			return !0;
		}, F.isAwaitUsing = function(e) {
			return this.isUsingKeyword(!0, e);
		}, F.isUsing = function(e) {
			return this.isUsingKeyword(!1, e);
		}, F.parseStatement = function(e, t, n) {
			var r = this.type, i = this.startNode(), a;
			switch (this.isLet(e) && (r = y._var, a = "let"), r) {
				case y._break:
				case y._continue: return this.parseBreakContinueStatement(i, r.keyword);
				case y._debugger: return this.parseDebuggerStatement(i);
				case y._do: return this.parseDoStatement(i);
				case y._for: return this.parseForStatement(i);
				case y._function: return e && (this.strict || e !== "if" && e !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(i, !1, !e);
				case y._class: return e && this.unexpected(), this.parseClass(i, !0);
				case y._if: return this.parseIfStatement(i);
				case y._return: return this.parseReturnStatement(i);
				case y._switch: return this.parseSwitchStatement(i);
				case y._throw: return this.parseThrowStatement(i);
				case y._try: return this.parseTryStatement(i);
				case y._const:
				case y._var: return a ||= this.value, e && a !== "var" && this.unexpected(), this.parseVarStatement(i, a);
				case y._while: return this.parseWhileStatement(i);
				case y._with: return this.parseWithStatement(i);
				case y.braceL: return this.parseBlock(!0, i);
				case y.semi: return this.parseEmptyStatement(i);
				case y._export:
				case y._import:
					if (this.options.ecmaVersion > 10 && r === y._import) {
						S.lastIndex = this.pos;
						var o = S.exec(this.input), s = this.pos + o[0].length, c = this.input.charCodeAt(s);
						if (c === 40 || c === 46) return this.parseExpressionStatement(i, this.parseExpression());
					}
					return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), r === y._import ? this.parseImport(i) : this.parseExport(i, n);
				default:
					if (this.isAsyncFunction()) return e && this.unexpected(), this.next(), this.parseFunctionStatement(i, !0, !e);
					var l = this.isAwaitUsing(!1) ? "await using" : this.isUsing(!1) ? "using" : null;
					if (l) return this.allowUsing || this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"), e && this.raise(this.start, "Using declaration is not allowed in single-statement positions"), l === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.next(), this.parseVar(i, !1, l), this.semicolon(), this.finishNode(i, "VariableDeclaration");
					var u = this.value, d = this.parseExpression();
					return r === y.name && d.type === "Identifier" && this.eat(y.colon) ? this.parseLabeledStatement(i, u, d, e) : this.parseExpressionStatement(i, d);
			}
		}, F.parseBreakContinueStatement = function(e, t) {
			var n = t === "break";
			this.next(), this.eat(y.semi) || this.insertSemicolon() ? e.label = null : this.type === y.name ? (e.label = this.parseIdent(), this.semicolon()) : this.unexpected();
			for (var r = 0; r < this.labels.length; ++r) {
				var i = this.labels[r];
				if ((e.label == null || i.name === e.label.name) && (i.kind != null && (n || i.kind === "loop") || e.label && n)) break;
			}
			return r === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, n ? "BreakStatement" : "ContinueStatement");
		}, F.parseDebuggerStatement = function(e) {
			return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
		}, F.parseDoStatement = function(e) {
			return this.next(), this.labels.push(Me), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(y._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(y.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
		}, F.parseForStatement = function(e) {
			this.next();
			var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
			if (this.labels.push(Me), this.enterScope(0), this.expect(y.parenL), this.type === y.semi) return t > -1 && this.unexpected(t), this.parseFor(e, null);
			var n = this.isLet();
			if (this.type === y._var || this.type === y._const || n) {
				var r = this.startNode(), i = n ? "let" : this.value;
				return this.next(), this.parseVar(r, !0, i), this.finishNode(r, "VariableDeclaration"), this.parseForAfterInit(e, r, t);
			}
			var a = this.isContextual("let"), o = !1, s = this.isUsing(!0) ? "using" : this.isAwaitUsing(!0) ? "await using" : null;
			if (s) {
				var c = this.startNode();
				return this.next(), s === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.parseVar(c, !0, s), this.finishNode(c, "VariableDeclaration"), this.parseForAfterInit(e, c, t);
			}
			var l = this.containsEsc, u = new je(), d = this.start, f = t > -1 ? this.parseExprSubscripts(u, "await") : this.parseExpression(!0, u);
			return this.type === y._in || (o = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (t > -1 ? (this.type === y._in && this.unexpected(t), e.await = !0) : o && this.options.ecmaVersion >= 8 && (f.start === d && !l && f.type === "Identifier" && f.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), a && o && this.raise(f.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(f, !1, u), this.checkLValPattern(f), this.parseForIn(e, f)) : (this.checkExpressionErrors(u, !0), t > -1 && this.unexpected(t), this.parseFor(e, f));
		}, F.parseForAfterInit = function(e, t, n) {
			return (this.type === y._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && t.declarations.length === 1 ? (this.type === y._in ? ((t.kind === "using" || t.kind === "await using") && !t.declarations[0].init && this.raise(this.start, "Using declaration is not allowed in for-in loops"), this.options.ecmaVersion >= 9 && n > -1 && this.unexpected(n)) : this.options.ecmaVersion >= 9 && (e.await = n > -1), this.parseForIn(e, t)) : (n > -1 && this.unexpected(n), this.parseFor(e, t));
		}, F.parseFunctionStatement = function(e, t, n) {
			return this.next(), this.parseFunction(e, Fe | (n ? 0 : Ie), !1, t);
		}, F.parseIfStatement = function(e) {
			return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(y._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
		}, F.parseReturnStatement = function(e) {
			return this.allowReturn || this.raise(this.start, "'return' outside of function"), this.next(), this.eat(y.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
		}, F.parseSwitchStatement = function(e) {
			this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(y.braceL), this.labels.push(Ne), this.enterScope(Se);
			for (var t, n = !1; this.type !== y.braceR;) if (this.type === y._case || this.type === y._default) {
				var r = this.type === y._case;
				t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), r ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), n = !0, t.test = null), this.expect(y.colon);
			} else t || this.unexpected(), t.consequent.push(this.parseStatement(null));
			return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
		}, F.parseThrowStatement = function(e) {
			return this.next(), b.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
		};
		var Pe = [];
		F.parseCatchClauseParam = function() {
			var e = this.parseBindingAtom(), t = e.type === "Identifier";
			return this.enterScope(t ? _e : 0), this.checkLValPattern(e, t ? Oe : j), this.expect(y.parenR), e;
		}, F.parseTryStatement = function(e) {
			if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === y._catch) {
				var t = this.startNode();
				this.next(), this.eat(y.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
			}
			return e.finalizer = this.eat(y._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
		}, F.parseVarStatement = function(e, t, n) {
			return this.next(), this.parseVar(e, !1, t, n), this.semicolon(), this.finishNode(e, "VariableDeclaration");
		}, F.parseWhileStatement = function(e) {
			return this.next(), e.test = this.parseParenExpression(), this.labels.push(Me), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
		}, F.parseWithStatement = function(e) {
			return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
		}, F.parseEmptyStatement = function(e) {
			return this.next(), this.finishNode(e, "EmptyStatement");
		}, F.parseLabeledStatement = function(e, t, n, r) {
			for (var i = 0, a = this.labels; i < a.length; i += 1) a[i].name === t && this.raise(n.start, "Label '" + t + "' is already declared");
			for (var o = this.type.isLoop ? "loop" : this.type === y._switch ? "switch" : null, s = this.labels.length - 1; s >= 0; s--) {
				var c = this.labels[s];
				if (c.statementStart === e.start) c.statementStart = this.start, c.kind = o;
				else break;
			}
			return this.labels.push({
				name: t,
				kind: o,
				statementStart: this.start
			}), e.body = this.parseStatement(r ? r.indexOf("label") === -1 ? r + "label" : r : "label"), this.labels.pop(), e.label = n, this.finishNode(e, "LabeledStatement");
		}, F.parseExpressionStatement = function(e, t) {
			return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
		}, F.parseBlock = function(e, t, n) {
			for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(y.braceL), e && this.enterScope(0); this.type !== y.braceR;) {
				var r = this.parseStatement(null);
				t.body.push(r);
			}
			return n && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
		}, F.parseFor = function(e, t) {
			return e.init = t, this.expect(y.semi), e.test = this.type === y.semi ? null : this.parseExpression(), this.expect(y.semi), e.update = this.type === y.parenR ? null : this.parseExpression(), this.expect(y.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
		}, F.parseForIn = function(e, t) {
			var n = this.type === y._in;
			return this.next(), t.type === "VariableDeclaration" && t.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || t.kind !== "var" || t.declarations[0].id.type !== "Identifier") && this.raise(t.start, (n ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"), e.left = t, e.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(y.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, n ? "ForInStatement" : "ForOfStatement");
		}, F.parseVar = function(e, t, n, r) {
			for (e.declarations = [], e.kind = n;;) {
				var i = this.startNode();
				if (this.parseVarId(i, n), this.eat(y.eq) ? i.init = this.parseMaybeAssign(t) : !r && n === "const" && !(this.type === y._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !r && (n === "using" || n === "await using") && this.options.ecmaVersion >= 17 && this.type !== y._in && !this.isContextual("of") ? this.raise(this.lastTokEnd, "Missing initializer in " + n + " declaration") : !r && i.id.type !== "Identifier" && !(t && (this.type === y._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : i.init = null, e.declarations.push(this.finishNode(i, "VariableDeclarator")), !this.eat(y.comma)) break;
			}
			return e;
		}, F.parseVarId = function(e, t) {
			e.id = t === "using" || t === "await using" ? this.parseIdent() : this.parseBindingAtom(), this.checkLValPattern(e.id, t === "var" ? Ee : j, !1);
		};
		var Fe = 1, Ie = 2, Le = 4;
		F.parseFunction = function(e, t, n, r, i) {
			this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !r) && (this.type === y.star && t & Ie && this.unexpected(), e.generator = this.eat(y.star)), this.options.ecmaVersion >= 8 && (e.async = !!r), t & Fe && (e.id = t & Le && this.type !== y.name ? null : this.parseIdent(), e.id && !(t & Ie) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? Ee : j : De));
			var a = this.yieldPos, o = this.awaitPos, s = this.awaitIdentPos;
			return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(we(e.async, e.generator)), t & Fe || (e.id = this.type === y.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, n, !1, i), this.yieldPos = a, this.awaitPos = o, this.awaitIdentPos = s, this.finishNode(e, t & Fe ? "FunctionDeclaration" : "FunctionExpression");
		}, F.parseFunctionParams = function(e) {
			this.expect(y.parenL), e.params = this.parseBindingList(y.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
		}, F.parseClass = function(e, t) {
			this.next();
			var n = this.strict;
			this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
			var r = this.enterClassBody(), i = this.startNode(), a = !1;
			for (i.body = [], this.expect(y.braceL); this.type !== y.braceR;) {
				var o = this.parseClassElement(e.superClass !== null);
				o && (i.body.push(o), o.type === "MethodDefinition" && o.kind === "constructor" ? (a && this.raiseRecoverable(o.start, "Duplicate constructor in the same class"), a = !0) : o.key && o.key.type === "PrivateIdentifier" && I(r, o) && this.raiseRecoverable(o.key.start, "Identifier '#" + o.key.name + "' has already been declared"));
			}
			return this.strict = n, this.next(), e.body = this.finishNode(i, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
		}, F.parseClassElement = function(e) {
			if (this.eat(y.semi)) return null;
			var t = this.options.ecmaVersion, n = this.startNode(), r = "", i = !1, a = !1, o = "method", s = !1;
			if (this.eatContextual("static")) {
				if (t >= 13 && this.eat(y.braceL)) return this.parseClassStaticBlock(n), n;
				this.isClassElementNameStart() || this.type === y.star ? s = !0 : r = "static";
			}
			if (n.static = s, !r && t >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === y.star) && !this.canInsertSemicolon() ? a = !0 : r = "async"), !r && (t >= 9 || !a) && this.eat(y.star) && (i = !0), !r && !a && !i) {
				var c = this.value;
				(this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? o = c : r = c);
			}
			if (r ? (n.computed = !1, n.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), n.key.name = r, this.finishNode(n.key, "Identifier")) : this.parseClassElementName(n), t < 13 || this.type === y.parenL || o !== "method" || i || a) {
				var l = !n.static && L(n, "constructor"), u = l && e;
				l && o !== "method" && this.raise(n.key.start, "Constructor can't have get/set modifier"), n.kind = l ? "constructor" : o, this.parseClassMethod(n, i, a, u);
			} else this.parseClassField(n);
			return n;
		}, F.isClassElementNameStart = function() {
			return this.type === y.name || this.type === y.privateId || this.type === y.num || this.type === y.string || this.type === y.bracketL || this.type.keyword;
		}, F.parseClassElementName = function(e) {
			this.type === y.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
		}, F.parseClassMethod = function(e, t, n, r) {
			var i = e.key;
			e.kind === "constructor" ? (t && this.raise(i.start, "Constructor can't be a generator"), n && this.raise(i.start, "Constructor can't be an async method")) : e.static && L(e, "prototype") && this.raise(i.start, "Classes may not have a static property named prototype");
			var a = e.value = this.parseMethod(t, n, r);
			return e.kind === "get" && a.params.length !== 0 && this.raiseRecoverable(a.start, "getter should have no params"), e.kind === "set" && a.params.length !== 1 && this.raiseRecoverable(a.start, "setter should have exactly one param"), e.kind === "set" && a.params[0].type === "RestElement" && this.raiseRecoverable(a.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
		}, F.parseClassField = function(e) {
			return L(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && L(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(y.eq) ? (this.enterScope(xe | ve), e.value = this.parseMaybeAssign(), this.exitScope()) : e.value = null, this.semicolon(), this.finishNode(e, "PropertyDefinition");
		}, F.parseClassStaticBlock = function(e) {
			e.body = [];
			var t = this.labels;
			for (this.labels = [], this.enterScope(be | ve); this.type !== y.braceR;) {
				var n = this.parseStatement(null);
				e.body.push(n);
			}
			return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
		}, F.parseClassId = function(e, t) {
			this.type === y.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, j, !1)) : (t === !0 && this.unexpected(), e.id = null);
		}, F.parseClassSuper = function(e) {
			e.superClass = this.eat(y._extends) ? this.parseExprSubscripts(null, !1) : null;
		}, F.enterClassBody = function() {
			var e = {
				declared: Object.create(null),
				used: []
			};
			return this.privateNameStack.push(e), e.declared;
		}, F.exitClassBody = function() {
			var e = this.privateNameStack.pop(), t = e.declared, n = e.used;
			if (this.options.checkPrivateFields) for (var r = this.privateNameStack.length, i = r === 0 ? null : this.privateNameStack[r - 1], a = 0; a < n.length; ++a) {
				var o = n[a];
				ie(t, o.name) || (i ? i.used.push(o) : this.raiseRecoverable(o.start, "Private field '#" + o.name + "' must be declared in an enclosing class"));
			}
		};
		function I(e, t) {
			var n = t.key.name, r = e[n], i = "true";
			return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (i = (t.static ? "s" : "i") + t.kind), r === "iget" && i === "iset" || r === "iset" && i === "iget" || r === "sget" && i === "sset" || r === "sset" && i === "sget" ? (e[n] = "true", !1) : r ? !0 : (e[n] = i, !1);
		}
		function L(e, t) {
			var n = e.computed, r = e.key;
			return !n && (r.type === "Identifier" && r.name === t || r.type === "Literal" && r.value === t);
		}
		F.parseExportAllDeclaration = function(e, t) {
			return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== y.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
		}, F.parseExport = function(e, t) {
			if (this.next(), this.eat(y.star)) return this.parseExportAllDeclaration(e, t);
			if (this.eat(y._default)) return this.checkExport(t, "default", this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, "ExportDefaultDeclaration");
			if (this.shouldParseExportStatement()) e.declaration = this.parseExportDeclaration(e), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
			else {
				if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from")) this.type !== y.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
				else {
					for (var n = 0, r = e.specifiers; n < r.length; n += 1) {
						var i = r[n];
						this.checkUnreserved(i.local), this.checkLocalExport(i.local), i.local.type === "Literal" && this.raise(i.local.start, "A string literal cannot be used as an exported binding without `from`.");
					}
					e.source = null, this.options.ecmaVersion >= 16 && (e.attributes = []);
				}
				this.semicolon();
			}
			return this.finishNode(e, "ExportNamedDeclaration");
		}, F.parseExportDeclaration = function(e) {
			return this.parseStatement(null);
		}, F.parseExportDefaultDeclaration = function() {
			var e;
			if (this.type === y._function || (e = this.isAsyncFunction())) {
				var t = this.startNode();
				return this.next(), e && this.next(), this.parseFunction(t, Fe | Le, !1, e);
			} else if (this.type === y._class) {
				var n = this.startNode();
				return this.parseClass(n, "nullableID");
			} else {
				var r = this.parseMaybeAssign();
				return this.semicolon(), r;
			}
		}, F.checkExport = function(e, t, n) {
			e && (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), ie(e, t) && this.raiseRecoverable(n, "Duplicate export '" + t + "'"), e[t] = !0);
		}, F.checkPatternExport = function(e, t) {
			var n = t.type;
			if (n === "Identifier") this.checkExport(e, t, t.start);
			else if (n === "ObjectPattern") for (var r = 0, i = t.properties; r < i.length; r += 1) {
				var a = i[r];
				this.checkPatternExport(e, a);
			}
			else if (n === "ArrayPattern") for (var o = 0, s = t.elements; o < s.length; o += 1) {
				var c = s[o];
				c && this.checkPatternExport(e, c);
			}
			else n === "Property" ? this.checkPatternExport(e, t.value) : n === "AssignmentPattern" ? this.checkPatternExport(e, t.left) : n === "RestElement" && this.checkPatternExport(e, t.argument);
		}, F.checkVariableExport = function(e, t) {
			if (e) for (var n = 0, r = t; n < r.length; n += 1) {
				var i = r[n];
				this.checkPatternExport(e, i.id);
			}
		}, F.shouldParseExportStatement = function() {
			return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
		}, F.parseExportSpecifier = function(e) {
			var t = this.startNode();
			return t.local = this.parseModuleExportName(), t.exported = this.eatContextual("as") ? this.parseModuleExportName() : t.local, this.checkExport(e, t.exported, t.exported.start), this.finishNode(t, "ExportSpecifier");
		}, F.parseExportSpecifiers = function(e) {
			var t = [], n = !0;
			for (this.expect(y.braceL); !this.eat(y.braceR);) {
				if (n) n = !1;
				else if (this.expect(y.comma), this.afterTrailingComma(y.braceR)) break;
				t.push(this.parseExportSpecifier(e));
			}
			return t;
		}, F.parseImport = function(e) {
			return this.next(), this.type === y.string ? (e.specifiers = Pe, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === y.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
		}, F.parseImportSpecifier = function() {
			var e = this.startNode();
			return e.imported = this.parseModuleExportName(), this.eatContextual("as") ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, j), this.finishNode(e, "ImportSpecifier");
		}, F.parseImportDefaultSpecifier = function() {
			var e = this.startNode();
			return e.local = this.parseIdent(), this.checkLValSimple(e.local, j), this.finishNode(e, "ImportDefaultSpecifier");
		}, F.parseImportNamespaceSpecifier = function() {
			var e = this.startNode();
			return this.next(), this.expectContextual("as"), e.local = this.parseIdent(), this.checkLValSimple(e.local, j), this.finishNode(e, "ImportNamespaceSpecifier");
		}, F.parseImportSpecifiers = function() {
			var e = [], t = !0;
			if (this.type === y.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(y.comma))) return e;
			if (this.type === y.star) return e.push(this.parseImportNamespaceSpecifier()), e;
			for (this.expect(y.braceL); !this.eat(y.braceR);) {
				if (t) t = !1;
				else if (this.expect(y.comma), this.afterTrailingComma(y.braceR)) break;
				e.push(this.parseImportSpecifier());
			}
			return e;
		}, F.parseWithClause = function() {
			var e = [];
			if (!this.eat(y._with)) return e;
			this.expect(y.braceL);
			for (var t = {}, n = !0; !this.eat(y.braceR);) {
				if (n) n = !1;
				else if (this.expect(y.comma), this.afterTrailingComma(y.braceR)) break;
				var r = this.parseImportAttribute(), i = r.key.type === "Identifier" ? r.key.name : r.key.value;
				ie(t, i) && this.raiseRecoverable(r.key.start, "Duplicate attribute key '" + i + "'"), t[i] = !0, e.push(r);
			}
			return e;
		}, F.parseImportAttribute = function() {
			var e = this.startNode();
			return e.key = this.type === y.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(y.colon), this.type !== y.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, "ImportAttribute");
		}, F.parseModuleExportName = function() {
			if (this.options.ecmaVersion >= 13 && this.type === y.string) {
				var e = this.parseLiteral(this.value);
				return oe.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
			}
			return this.parseIdent(!0);
		}, F.adaptDirectivePrologue = function(e) {
			for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t) e[t].directive = e[t].expression.raw.slice(1, -1);
		}, F.isDirectiveCandidate = function(e) {
			return this.options.ecmaVersion >= 5 && e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && (this.input[e.start] === "\"" || this.input[e.start] === "'");
		};
		var R = M.prototype;
		R.toAssignable = function(e, t, n) {
			if (this.options.ecmaVersion >= 6 && e) switch (e.type) {
				case "Identifier":
					this.inAsync && e.name === "await" && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
					break;
				case "ObjectPattern":
				case "ArrayPattern":
				case "AssignmentPattern":
				case "RestElement": break;
				case "ObjectExpression":
					e.type = "ObjectPattern", n && this.checkPatternErrors(n, !0);
					for (var r = 0, i = e.properties; r < i.length; r += 1) {
						var a = i[r];
						this.toAssignable(a, t), a.type === "RestElement" && (a.argument.type === "ArrayPattern" || a.argument.type === "ObjectPattern") && this.raise(a.argument.start, "Unexpected token");
					}
					break;
				case "Property":
					e.kind !== "init" && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
					break;
				case "ArrayExpression":
					e.type = "ArrayPattern", n && this.checkPatternErrors(n, !0), this.toAssignableList(e.elements, t);
					break;
				case "SpreadElement":
					e.type = "RestElement", this.toAssignable(e.argument, t), e.argument.type === "AssignmentPattern" && this.raise(e.argument.start, "Rest elements cannot have a default value");
					break;
				case "AssignmentExpression":
					e.operator !== "=" && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
					break;
				case "ParenthesizedExpression":
					this.toAssignable(e.expression, t, n);
					break;
				case "ChainExpression":
					this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
					break;
				case "MemberExpression": if (!t) break;
				default: this.raise(e.start, "Assigning to rvalue");
			}
			else n && this.checkPatternErrors(n, !0);
			return e;
		}, R.toAssignableList = function(e, t) {
			for (var n = e.length, r = 0; r < n; r++) {
				var i = e[r];
				i && this.toAssignable(i, t);
			}
			if (n) {
				var a = e[n - 1];
				this.options.ecmaVersion === 6 && t && a && a.type === "RestElement" && a.argument.type !== "Identifier" && this.unexpected(a.argument.start);
			}
			return e;
		}, R.parseSpread = function(e) {
			var t = this.startNode();
			return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");
		}, R.parseRestBinding = function() {
			var e = this.startNode();
			return this.next(), this.options.ecmaVersion === 6 && this.type !== y.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
		}, R.parseBindingAtom = function() {
			if (this.options.ecmaVersion >= 6) switch (this.type) {
				case y.bracketL:
					var e = this.startNode();
					return this.next(), e.elements = this.parseBindingList(y.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
				case y.braceL: return this.parseObj(!0);
			}
			return this.parseIdent();
		}, R.parseBindingList = function(e, t, n, r) {
			for (var i = [], a = !0; !this.eat(e);) if (a ? a = !1 : this.expect(y.comma), t && this.type === y.comma) i.push(null);
			else if (n && this.afterTrailingComma(e)) break;
			else if (this.type === y.ellipsis) {
				var o = this.parseRestBinding();
				this.parseBindingListItem(o), i.push(o), this.type === y.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(e);
				break;
			} else i.push(this.parseAssignableListItem(r));
			return i;
		}, R.parseAssignableListItem = function(e) {
			var t = this.parseMaybeDefault(this.start, this.startLoc);
			return this.parseBindingListItem(t), t;
		}, R.parseBindingListItem = function(e) {
			return e;
		}, R.parseMaybeDefault = function(e, t, n) {
			if (n ||= this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(y.eq)) return n;
			var r = this.startNodeAt(e, t);
			return r.left = n, r.right = this.parseMaybeAssign(), this.finishNode(r, "AssignmentPattern");
		}, R.checkLValSimple = function(e, t, n) {
			t === void 0 && (t = Te);
			var r = t !== Te;
			switch (e.type) {
				case "Identifier":
					this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (r ? "Binding " : "Assigning to ") + e.name + " in strict mode"), r && (t === j && e.name === "let" && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), n && (ie(n, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), n[e.name] = !0), t !== ke && this.declareName(e.name, t, e.start));
					break;
				case "ChainExpression":
					this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
					break;
				case "MemberExpression":
					r && this.raiseRecoverable(e.start, "Binding member expression");
					break;
				case "ParenthesizedExpression": return r && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, n);
				default: this.raise(e.start, (r ? "Binding" : "Assigning to") + " rvalue");
			}
		}, R.checkLValPattern = function(e, t, n) {
			switch (t === void 0 && (t = Te), e.type) {
				case "ObjectPattern":
					for (var r = 0, i = e.properties; r < i.length; r += 1) {
						var a = i[r];
						this.checkLValInnerPattern(a, t, n);
					}
					break;
				case "ArrayPattern":
					for (var o = 0, s = e.elements; o < s.length; o += 1) {
						var c = s[o];
						c && this.checkLValInnerPattern(c, t, n);
					}
					break;
				default: this.checkLValSimple(e, t, n);
			}
		}, R.checkLValInnerPattern = function(e, t, n) {
			switch (t === void 0 && (t = Te), e.type) {
				case "Property":
					this.checkLValInnerPattern(e.value, t, n);
					break;
				case "AssignmentPattern":
					this.checkLValPattern(e.left, t, n);
					break;
				case "RestElement":
					this.checkLValPattern(e.argument, t, n);
					break;
				default: this.checkLValPattern(e, t, n);
			}
		};
		var z = function(e, t, n, r, i) {
			this.token = e, this.isExpr = !!t, this.preserveSpace = !!n, this.override = r, this.generator = !!i;
		}, B = {
			b_stat: new z("{", !1),
			b_expr: new z("{", !0),
			b_tmpl: new z("${", !1),
			p_stat: new z("(", !1),
			p_expr: new z("(", !0),
			q_tmpl: new z("`", !0, !0, function(e) {
				return e.tryReadTemplateToken();
			}),
			f_stat: new z("function", !1),
			f_expr: new z("function", !0),
			f_expr_gen: new z("function", !0, !1, null, !0),
			f_gen: new z("function", !1, !1, null, !0)
		}, V = M.prototype;
		V.initialContext = function() {
			return [B.b_stat];
		}, V.curContext = function() {
			return this.context[this.context.length - 1];
		}, V.braceIsBlock = function(e) {
			var t = this.curContext();
			return t === B.f_expr || t === B.f_stat ? !0 : e === y.colon && (t === B.b_stat || t === B.b_expr) ? !t.isExpr : e === y._return || e === y.name && this.exprAllowed ? b.test(this.input.slice(this.lastTokEnd, this.start)) : e === y._else || e === y.semi || e === y.eof || e === y.parenR || e === y.arrow ? !0 : e === y.braceL ? t === B.b_stat : e === y._var || e === y._const || e === y.name ? !1 : !this.exprAllowed;
		}, V.inGeneratorContext = function() {
			for (var e = this.context.length - 1; e >= 1; e--) {
				var t = this.context[e];
				if (t.token === "function") return t.generator;
			}
			return !1;
		}, V.updateContext = function(e) {
			var t, n = this.type;
			n.keyword && e === y.dot ? this.exprAllowed = !1 : (t = n.updateContext) ? t.call(this, e) : this.exprAllowed = n.beforeExpr;
		}, V.overrideContext = function(e) {
			this.curContext() !== e && (this.context[this.context.length - 1] = e);
		}, y.parenR.updateContext = y.braceR.updateContext = function() {
			if (this.context.length === 1) {
				this.exprAllowed = !0;
				return;
			}
			var e = this.context.pop();
			e === B.b_stat && this.curContext().token === "function" && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
		}, y.braceL.updateContext = function(e) {
			this.context.push(this.braceIsBlock(e) ? B.b_stat : B.b_expr), this.exprAllowed = !0;
		}, y.dollarBraceL.updateContext = function() {
			this.context.push(B.b_tmpl), this.exprAllowed = !0;
		}, y.parenL.updateContext = function(e) {
			var t = e === y._if || e === y._for || e === y._with || e === y._while;
			this.context.push(t ? B.p_stat : B.p_expr), this.exprAllowed = !0;
		}, y.incDec.updateContext = function() {}, y._function.updateContext = y._class.updateContext = function(e) {
			e.beforeExpr && e !== y._else && !(e === y.semi && this.curContext() !== B.p_stat) && !(e === y._return && b.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === y.colon || e === y.braceL) && this.curContext() === B.b_stat) ? this.context.push(B.f_expr) : this.context.push(B.f_stat), this.exprAllowed = !1;
		}, y.colon.updateContext = function() {
			this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
		}, y.backQuote.updateContext = function() {
			this.curContext() === B.q_tmpl ? this.context.pop() : this.context.push(B.q_tmpl), this.exprAllowed = !1;
		}, y.star.updateContext = function(e) {
			if (e === y._function) {
				var t = this.context.length - 1;
				this.context[t] === B.f_expr ? this.context[t] = B.f_expr_gen : this.context[t] = B.f_gen;
			}
			this.exprAllowed = !0;
		}, y.name.updateContext = function(e) {
			var t = !1;
			this.options.ecmaVersion >= 6 && e !== y.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
		};
		var H = M.prototype;
		H.checkPropClash = function(e, t, n) {
			if (!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
				var r = e.key, i;
				switch (r.type) {
					case "Identifier":
						i = r.name;
						break;
					case "Literal":
						i = String(r.value);
						break;
					default: return;
				}
				var a = e.kind;
				if (this.options.ecmaVersion >= 6) {
					i === "__proto__" && a === "init" && (t.proto && (n ? n.doubleProto < 0 && (n.doubleProto = r.start) : this.raiseRecoverable(r.start, "Redefinition of __proto__ property")), t.proto = !0);
					return;
				}
				i = "$" + i;
				var o = t[i];
				o ? (a === "init" ? this.strict && o.init || o.get || o.set : o.init || o[a]) && this.raiseRecoverable(r.start, "Redefinition of property") : o = t[i] = {
					init: !1,
					get: !1,
					set: !1
				}, o[a] = !0;
			}
		}, H.parseExpression = function(e, t) {
			var n = this;
			return this.catchStackOverflow(function() {
				var r = n.start, i = n.startLoc, a = n.parseMaybeAssign(e, t);
				if (n.type === y.comma) {
					var o = n.startNodeAt(r, i);
					for (o.expressions = [a]; n.eat(y.comma);) o.expressions.push(n.parseMaybeAssign(e, t));
					return n.finishNode(o, "SequenceExpression");
				}
				return a;
			});
		}, H.parseMaybeAssign = function(e, t, n) {
			if (this.isContextual("yield")) {
				if (this.inGenerator) return this.parseYield(e);
				this.exprAllowed = !1;
			}
			var r = !1, i = -1, a = -1, o = -1;
			t ? (i = t.parenthesizedAssign, a = t.trailingComma, o = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new je(), r = !0);
			var s = this.start, c = this.startLoc;
			(this.type === y.parenL || this.type === y.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
			var l = this.parseMaybeConditional(e, t);
			if (n && (l = n.call(this, l, s, c)), this.type.isAssign) {
				var u = this.startNodeAt(s, c);
				return u.operator = this.value, this.type === y.eq && (l = this.toAssignable(l, !1, t)), r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= l.start && (t.shorthandAssign = -1), this.type === y.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), u.left = l, this.next(), u.right = this.parseMaybeAssign(e), o > -1 && (t.doubleProto = o), this.finishNode(u, "AssignmentExpression");
			} else r && this.checkExpressionErrors(t, !0);
			return i > -1 && (t.parenthesizedAssign = i), a > -1 && (t.trailingComma = a), l;
		}, H.parseMaybeConditional = function(e, t) {
			var n = this.start, r = this.startLoc, i = this.parseExprOps(e, t);
			if (this.checkExpressionErrors(t)) return i;
			if (!(i.type === "ArrowFunctionExpression" && i.start === n) && this.eat(y.question)) {
				var a = this.startNodeAt(n, r);
				return a.test = i, a.consequent = this.parseMaybeAssign(), this.expect(y.colon), a.alternate = this.parseMaybeAssign(e), this.finishNode(a, "ConditionalExpression");
			}
			return i;
		}, H.parseExprOps = function(e, t) {
			var n = this.start, r = this.startLoc, i = this.parseMaybeUnary(t, !1, !1, e);
			return this.checkExpressionErrors(t) || i.start === n && i.type === "ArrowFunctionExpression" ? i : this.parseExprOp(i, n, r, -1, e);
		}, H.parseExprOp = function(e, t, n, r, i) {
			var a = this.type.binop;
			if (a != null && (!i || this.type !== y._in) && a > r) {
				var o = this.type === y.logicalOR || this.type === y.logicalAND, s = this.type === y.coalesce;
				s && (a = y.logicalAND.binop);
				var c = this.value;
				this.next();
				var l = this.start, u = this.startLoc, d = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, i), l, u, a, i), f = this.buildBinary(t, n, e, d, c, o || s);
				return (o && this.type === y.coalesce || s && (this.type === y.logicalOR || this.type === y.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(f, t, n, r, i);
			}
			return e;
		}, H.buildBinary = function(e, t, n, r, i, a) {
			r.type === "PrivateIdentifier" && this.raise(r.start, "Private identifier can only be left side of binary expression");
			var o = this.startNodeAt(e, t);
			return o.left = n, o.operator = i, o.right = r, this.finishNode(o, a ? "LogicalExpression" : "BinaryExpression");
		}, H.parseMaybeUnary = function(e, t, n, r) {
			var i = this.start, a = this.startLoc, o;
			if (this.isContextual("await") && this.canAwait) o = this.parseAwait(r), t = !0;
			else if (this.type.prefix) {
				var s = this.startNode(), c = this.type === y.incDec;
				s.operator = this.value, s.prefix = !0, this.next(), s.argument = this.parseMaybeUnary(null, !0, c, r), this.checkExpressionErrors(e, !0), c ? this.checkLValSimple(s.argument) : this.strict && s.operator === "delete" && Re(s.argument) ? this.raiseRecoverable(s.start, "Deleting local variable in strict mode") : s.operator === "delete" && ze(s.argument) ? this.raiseRecoverable(s.start, "Private fields can not be deleted") : t = !0, o = this.finishNode(s, c ? "UpdateExpression" : "UnaryExpression");
			} else if (!t && this.type === y.privateId) (r || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), o = this.parsePrivateIdent(), this.type !== y._in && this.unexpected();
			else {
				if (o = this.parseExprSubscripts(e, r), this.checkExpressionErrors(e)) return o;
				for (; this.type.postfix && !this.canInsertSemicolon();) {
					var l = this.startNodeAt(i, a);
					l.operator = this.value, l.prefix = !1, l.argument = o, this.checkLValSimple(o), this.next(), o = this.finishNode(l, "UpdateExpression");
				}
			}
			if (!n && this.eat(y.starstar)) if (t) this.unexpected(this.lastTokStart);
			else return this.buildBinary(i, a, o, this.parseMaybeUnary(null, !1, !1, r), "**", !1);
			else return o;
		};
		function Re(e) {
			return e.type === "Identifier" || e.type === "ParenthesizedExpression" && Re(e.expression);
		}
		function ze(e) {
			return e.type === "MemberExpression" && e.property.type === "PrivateIdentifier" || e.type === "ChainExpression" && ze(e.expression) || e.type === "ParenthesizedExpression" && ze(e.expression);
		}
		H.parseExprSubscripts = function(e, t) {
			var n = this.start, r = this.startLoc, i = this.parseExprAtom(e, t);
			if (i.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") return i;
			var a = this.parseSubscripts(i, n, r, !1, t);
			return e && a.type === "MemberExpression" && (e.parenthesizedAssign >= a.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= a.start && (e.parenthesizedBind = -1), e.trailingComma >= a.start && (e.trailingComma = -1)), a;
		}, H.parseSubscripts = function(e, t, n, r, i) {
			for (var a = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, o = !1;;) {
				var s = this.parseSubscript(e, t, n, r, a, o, i);
				if (s.optional && (o = !0), s === e || s.type === "ArrowFunctionExpression") {
					if (o) {
						var c = this.startNodeAt(t, n);
						c.expression = s, s = this.finishNode(c, "ChainExpression");
					}
					return s;
				}
				e = s;
			}
		}, H.shouldParseAsyncArrow = function() {
			return !this.canInsertSemicolon() && this.eat(y.arrow);
		}, H.parseSubscriptAsyncArrow = function(e, t, n, r) {
			return this.parseArrowExpression(this.startNodeAt(e, t), n, !0, r);
		}, H.parseSubscript = function(e, t, n, r, i, a, o) {
			var s = this.options.ecmaVersion >= 11, c = s && this.eat(y.questionDot);
			r && c && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
			var l = this.eat(y.bracketL);
			if (l || c && this.type !== y.parenL && this.type !== y.backQuote || this.eat(y.dot)) {
				var u = this.startNodeAt(t, n);
				u.object = e, l ? (u.property = this.parseExpression(), this.expect(y.bracketR)) : this.type === y.privateId && e.type !== "Super" ? u.property = this.parsePrivateIdent() : u.property = this.parseIdent(this.options.allowReserved !== "never"), u.computed = !!l, s && (u.optional = c), e = this.finishNode(u, "MemberExpression");
			} else if (!r && this.eat(y.parenL)) {
				var d = new je(), f = this.yieldPos, p = this.awaitPos, m = this.awaitIdentPos;
				this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
				var h = this.parseExprList(y.parenR, this.options.ecmaVersion >= 8, !1, d);
				if (i && !c && this.shouldParseAsyncArrow()) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = f, this.awaitPos = p, this.awaitIdentPos = m, this.parseSubscriptAsyncArrow(t, n, h, o);
				this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, this.awaitIdentPos = m || this.awaitIdentPos;
				var g = this.startNodeAt(t, n);
				g.callee = e, g.arguments = h, s && (g.optional = c), e = this.finishNode(g, "CallExpression");
			} else if (this.type === y.backQuote) {
				(c || a) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
				var _ = this.startNodeAt(t, n);
				_.tag = e, _.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(_, "TaggedTemplateExpression");
			}
			return e;
		}, H.parseExprAtom = function(e, t, n) {
			this.type === y.slash && this.readRegexp();
			var r, i = this.potentialArrowAt === this.start;
			switch (this.type) {
				case y._super: return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), r = this.startNode(), this.next(), this.type === y.parenL && !this.allowDirectSuper && this.raise(r.start, "super() call outside constructor of a subclass"), this.type !== y.dot && this.type !== y.bracketL && this.type !== y.parenL && this.unexpected(), this.finishNode(r, "Super");
				case y._this: return r = this.startNode(), this.next(), this.finishNode(r, "ThisExpression");
				case y.name:
					var a = this.start, o = this.startLoc, s = this.containsEsc, c = this.parseIdent(!1);
					if (this.options.ecmaVersion >= 8 && !s && c.name === "async" && !this.canInsertSemicolon() && this.eat(y._function)) return this.overrideContext(B.f_expr), this.parseFunction(this.startNodeAt(a, o), 0, !1, !0, t);
					if (i && !this.canInsertSemicolon()) {
						if (this.eat(y.arrow)) return this.parseArrowExpression(this.startNodeAt(a, o), [c], !1, t);
						if (this.options.ecmaVersion >= 8 && c.name === "async" && this.type === y.name && !s && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) return c = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(y.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(a, o), [c], !0, t);
					}
					return c;
				case y.regexp:
					var l = this.value;
					return r = this.parseLiteral(l.value), r.regex = {
						pattern: l.pattern,
						flags: l.flags
					}, r;
				case y.num:
				case y.string: return this.parseLiteral(this.value);
				case y._null:
				case y._true:
				case y._false: return r = this.startNode(), r.value = this.type === y._null ? null : this.type === y._true, r.raw = this.type.keyword, this.next(), this.finishNode(r, "Literal");
				case y.parenL:
					var u = this.start, d = this.parseParenAndDistinguishExpression(i, t);
					return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(d) && (e.parenthesizedAssign = u), e.parenthesizedBind < 0 && (e.parenthesizedBind = u)), d;
				case y.bracketL: return r = this.startNode(), this.next(), r.elements = this.parseExprList(y.bracketR, !0, !0, e), this.finishNode(r, "ArrayExpression");
				case y.braceL: return this.overrideContext(B.b_expr), this.parseObj(!1, e);
				case y._function: return r = this.startNode(), this.next(), this.parseFunction(r, 0);
				case y._class: return this.parseClass(this.startNode(), !1);
				case y._new: return this.parseNew();
				case y.backQuote: return this.parseTemplate();
				case y._import: return this.options.ecmaVersion >= 11 ? this.parseExprImport(n) : this.unexpected();
				default: return this.parseExprAtomDefault();
			}
		}, H.parseExprAtomDefault = function() {
			this.unexpected();
		}, H.parseExprImport = function(e) {
			var t = this.startNode();
			if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === y.parenL && !e) return this.parseDynamicImport(t);
			if (this.type === y.dot) {
				var n = this.startNodeAt(t.start, t.loc && t.loc.start);
				return n.name = "import", t.meta = this.finishNode(n, "Identifier"), this.parseImportMeta(t);
			} else this.unexpected();
		}, H.parseDynamicImport = function(e) {
			if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16) this.eat(y.parenR) ? e.options = null : (this.expect(y.comma), this.afterTrailingComma(y.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(y.parenR) || (this.expect(y.comma), this.afterTrailingComma(y.parenR) || this.unexpected())));
			else if (!this.eat(y.parenR)) {
				var t = this.start;
				this.eat(y.comma) && this.eat(y.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
			}
			return this.finishNode(e, "ImportExpression");
		}, H.parseImportMeta = function(e) {
			this.next();
			var t = this.containsEsc;
			return e.property = this.parseIdent(!0), e.property.name !== "meta" && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
		}, H.parseLiteral = function(e) {
			var t = this.startNode();
			return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.value == null ? t.raw.slice(0, -1).replace(/_/g, "") : t.value.toString()), this.next(), this.finishNode(t, "Literal");
		}, H.parseParenExpression = function() {
			this.expect(y.parenL);
			var e = this.parseExpression();
			return this.expect(y.parenR), e;
		}, H.shouldParseArrow = function(e) {
			return !this.canInsertSemicolon();
		}, H.parseParenAndDistinguishExpression = function(e, t) {
			var n = this.start, r = this.startLoc, i, a = this.options.ecmaVersion >= 8;
			if (this.options.ecmaVersion >= 6) {
				this.next();
				var o = this.start, s = this.startLoc, c = [], l = !0, u = !1, d = new je(), f = this.yieldPos, p = this.awaitPos, m;
				for (this.yieldPos = 0, this.awaitPos = 0; this.type !== y.parenR;) if (l ? l = !1 : this.expect(y.comma), a && this.afterTrailingComma(y.parenR, !0)) {
					u = !0;
					break;
				} else if (this.type === y.ellipsis) {
					m = this.start, c.push(this.parseParenItem(this.parseRestBinding())), this.type === y.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
					break;
				} else c.push(this.parseMaybeAssign(!1, d, this.parseParenItem));
				var h = this.lastTokEnd, g = this.lastTokEndLoc;
				if (this.expect(y.parenR), e && this.shouldParseArrow(c) && this.eat(y.arrow)) return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = f, this.awaitPos = p, this.parseParenArrowList(n, r, c, t);
				(!c.length || u) && this.unexpected(this.lastTokStart), m && this.unexpected(m), this.checkExpressionErrors(d, !0), this.yieldPos = f || this.yieldPos, this.awaitPos = p || this.awaitPos, c.length > 1 ? (i = this.startNodeAt(o, s), i.expressions = c, this.finishNodeAt(i, "SequenceExpression", h, g)) : i = c[0];
			} else i = this.parseParenExpression();
			if (this.options.preserveParens) {
				var _ = this.startNodeAt(n, r);
				return _.expression = i, this.finishNode(_, "ParenthesizedExpression");
			} else return i;
		}, H.parseParenItem = function(e) {
			return e;
		}, H.parseParenArrowList = function(e, t, n, r) {
			return this.parseArrowExpression(this.startNodeAt(e, t), n, !1, r);
		};
		var Be = [];
		H.parseNew = function() {
			this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
			var e = this.startNode();
			if (this.next(), this.options.ecmaVersion >= 6 && this.type === y.dot) {
				var t = this.startNodeAt(e.start, e.loc && e.loc.start);
				t.name = "new", e.meta = this.finishNode(t, "Identifier"), this.next();
				var n = this.containsEsc;
				return e.property = this.parseIdent(!0), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), n && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
			}
			var r = this.start, i = this.startLoc;
			return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), r, i, !0, !1), e.callee.type === "Super" && this.raiseRecoverable(r, "Invalid use of 'super'"), this.eat(y.parenL) ? e.arguments = this.parseExprList(y.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = Be, this.finishNode(e, "NewExpression");
		}, H.parseTemplateElement = function(e) {
			var t = e.isTagged, n = this.startNode();
			return this.type === y.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), n.value = {
				raw: this.value.replace(/\r\n?/g, "\n"),
				cooked: null
			}) : n.value = {
				raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
				cooked: this.value
			}, this.next(), n.tail = this.type === y.backQuote, this.finishNode(n, "TemplateElement");
		}, H.parseTemplate = function(e) {
			e === void 0 && (e = {});
			var t = e.isTagged;
			t === void 0 && (t = !1);
			var n = this.startNode();
			this.next(), n.expressions = [];
			var r = this.parseTemplateElement({ isTagged: t });
			for (n.quasis = [r]; !r.tail;) this.type === y.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(y.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(y.braceR), n.quasis.push(r = this.parseTemplateElement({ isTagged: t }));
			return this.next(), this.finishNode(n, "TemplateLiteral");
		}, H.isAsyncProp = function(e) {
			return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === y.name || this.type === y.num || this.type === y.string || this.type === y.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === y.star) && !b.test(this.input.slice(this.lastTokEnd, this.start));
		}, H.parseObj = function(e, t) {
			var n = this.startNode(), r = !0, i = {};
			for (n.properties = [], this.next(); !this.eat(y.braceR);) {
				if (r) r = !1;
				else if (this.expect(y.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(y.braceR)) break;
				var a = this.parseProperty(e, t);
				e || this.checkPropClash(a, i, t), n.properties.push(a);
			}
			return this.finishNode(n, e ? "ObjectPattern" : "ObjectExpression");
		}, H.parseProperty = function(e, t) {
			var n = this.startNode(), r, i, a, o;
			if (this.options.ecmaVersion >= 9 && this.eat(y.ellipsis)) return e ? (n.argument = this.parseIdent(!1), this.type === y.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(n, "RestElement")) : (n.argument = this.parseMaybeAssign(!1, t), this.type === y.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(n, "SpreadElement"));
			this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (e || t) && (a = this.start, o = this.startLoc), e || (r = this.eat(y.star)));
			var s = this.containsEsc;
			return this.parsePropertyName(n), !e && !s && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(n) ? (i = !0, r = this.options.ecmaVersion >= 9 && this.eat(y.star), this.parsePropertyName(n)) : i = !1, this.parsePropertyValue(n, e, r, i, a, o, t, s), this.finishNode(n, "Property");
		}, H.parseGetterSetter = function(e) {
			var t = e.key.name;
			this.parsePropertyName(e), e.value = this.parseMethod(!1), e.kind = t;
			var n = e.kind === "get" ? 0 : 1;
			if (e.value.params.length !== n) {
				var r = e.value.start;
				e.kind === "get" ? this.raiseRecoverable(r, "getter should have no params") : this.raiseRecoverable(r, "setter should have exactly one param");
			} else e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
		}, H.parsePropertyValue = function(e, t, n, r, i, a, o, s) {
			(n || r) && this.type === y.colon && this.unexpected(), this.eat(y.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, o), e.kind = "init") : this.options.ecmaVersion >= 6 && this.type === y.parenL ? (t && this.unexpected(), e.method = !0, e.value = this.parseMethod(n, r), e.kind = "init") : !t && !s && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== y.comma && this.type !== y.braceR && this.type !== y.eq ? ((n || r) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier" ? ((n || r) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = i), t ? e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key)) : this.type === y.eq && o ? (o.shorthandAssign < 0 && (o.shorthandAssign = this.start), e.value = this.parseMaybeDefault(i, a, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.kind = "init", e.shorthand = !0) : this.unexpected();
		}, H.parsePropertyName = function(e) {
			if (this.options.ecmaVersion >= 6) {
				if (this.eat(y.bracketL)) return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(y.bracketR), e.key;
				e.computed = !1;
			}
			return e.key = this.type === y.num || this.type === y.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
		}, H.initFunction = function(e) {
			e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
		}, H.parseMethod = function(e, t, n) {
			var r = this.startNode(), i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
			return this.initFunction(r), this.options.ecmaVersion >= 6 && (r.generator = e), this.options.ecmaVersion >= 8 && (r.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(we(t, r.generator) | ve | (n ? ye : 0)), this.expect(y.parenL), r.params = this.parseBindingList(y.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(r, "FunctionExpression");
		}, H.parseArrowExpression = function(e, t, n, r) {
			var i = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
			return this.enterScope(we(n, !1) | ge), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, r), this.yieldPos = i, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(e, "ArrowFunctionExpression");
		}, H.parseFunctionBody = function(e, t, n, r) {
			var i = t && this.type !== y.braceL, a = this.strict, o = !1;
			if (i) e.body = this.parseMaybeAssign(r), e.expression = !0, this.checkParams(e, !1);
			else {
				var s = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
				(!a || s) && (o = this.strictDirective(this.end), o && s && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
				var c = this.labels;
				this.labels = [], o && (this.strict = !0), this.checkParams(e, !a && !o && !t && !n && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, ke), e.body = this.parseBlock(!1, void 0, o && !a), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = c;
			}
			this.exitScope();
		}, H.isSimpleParamList = function(e) {
			for (var t = 0, n = e; t < n.length; t += 1) if (n[t].type !== "Identifier") return !1;
			return !0;
		}, H.checkParams = function(e, t) {
			for (var n = Object.create(null), r = 0, i = e.params; r < i.length; r += 1) {
				var a = i[r];
				this.checkLValInnerPattern(a, Ee, t ? null : n);
			}
		}, H.parseExprList = function(e, t, n, r) {
			for (var i = [], a = !0; !this.eat(e);) {
				if (a) a = !1;
				else if (this.expect(y.comma), t && this.afterTrailingComma(e)) break;
				var o = void 0;
				n && this.type === y.comma ? o = null : this.type === y.ellipsis ? (o = this.parseSpread(r), r && this.type === y.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : o = this.parseMaybeAssign(!1, r), i.push(o);
			}
			return i;
		}, H.checkUnreserved = function(e) {
			var t = e.start, n = e.end, r = e.name;
			this.inGenerator && r === "yield" && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), !(this.currentThisScope().flags & Ce) && r === "arguments" && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (r === "arguments" || r === "await") && this.raise(t, "Cannot use " + r + " in class static initialization block"), this.keywords.test(r) && this.raise(t, "Unexpected keyword '" + r + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(t, n).indexOf("\\") !== -1) && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(r) && (!this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + r + "' is reserved"));
		}, H.parseIdent = function(e) {
			var t = this.parseIdentNode();
			return this.next(!!e), this.finishNode(t, "Identifier"), e || (this.checkUnreserved(t), t.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
		}, H.parseIdentNode = function() {
			var e = this.startNode();
			return this.type === y.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === "class" || e.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = y.name) : this.unexpected(), e;
		}, H.parsePrivateIdent = function() {
			var e = this.startNode();
			return this.type === y.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
		}, H.parseYield = function(e) {
			this.yieldPos ||= this.start;
			var t = this.startNode();
			return this.next(), this.type === y.semi || this.canInsertSemicolon() || this.type !== y.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(y.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
		}, H.parseAwait = function(e) {
			this.awaitPos ||= this.start;
			var t = this.startNode();
			return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression");
		};
		var Ve = M.prototype;
		Ve.raise = function(e, t) {
			var n = k(this.input, e);
			t += " (" + n.line + ":" + n.column + ")", this.sourceFile && (t += " in " + this.sourceFile);
			var r = SyntaxError(t);
			throw r.pos = e, r.loc = n, r.raisedAt = this.pos, r;
		}, Ve.raiseRecoverable = Ve.raise, Ve.curPosition = function() {
			if (this.options.locations) return new se(this.curLine, this.pos - this.lineStart);
		};
		var He = M.prototype, Ue = function(e) {
			this.flags = e, this.var = [], this.lexical = [], this.functions = [];
		};
		He.enterScope = function(e) {
			this.scopeStack.push(new Ue(e));
		}, He.exitScope = function() {
			this.scopeStack.pop();
		}, He.treatFunctionsAsVarInScope = function(e) {
			return e.flags & me || !this.inModule && e.flags & pe;
		}, He.declareName = function(e, t, n) {
			var r = !1;
			if (t === j) {
				var i = this.currentScope();
				r = i.lexical.indexOf(e) > -1 || i.functions.indexOf(e) > -1 || i.var.indexOf(e) > -1, i.lexical.push(e), this.inModule && i.flags & pe && delete this.undefinedExports[e];
			} else if (t === Oe) this.currentScope().lexical.push(e);
			else if (t === De) {
				var a = this.currentScope();
				r = this.treatFunctionsAsVar ? a.lexical.indexOf(e) > -1 : a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.functions.push(e);
			} else for (var o = this.scopeStack.length - 1; o >= 0; --o) {
				var s = this.scopeStack[o];
				if (s.lexical.indexOf(e) > -1 && !(s.flags & _e && s.lexical[0] === e) || !this.treatFunctionsAsVarInScope(s) && s.functions.indexOf(e) > -1) {
					r = !0;
					break;
				}
				if (s.var.push(e), this.inModule && s.flags & pe && delete this.undefinedExports[e], s.flags & Ce) break;
			}
			r && this.raiseRecoverable(n, "Identifier '" + e + "' has already been declared");
		}, He.checkLocalExport = function(e) {
			this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
		}, He.currentScope = function() {
			return this.scopeStack[this.scopeStack.length - 1];
		}, He.currentVarScope = function() {
			for (var e = this.scopeStack.length - 1;; e--) {
				var t = this.scopeStack[e];
				if (t.flags & (Ce | xe | be)) return t;
			}
		}, He.currentThisScope = function() {
			for (var e = this.scopeStack.length - 1;; e--) {
				var t = this.scopeStack[e];
				if (t.flags & (Ce | xe | be) && !(t.flags & ge)) return t;
			}
		};
		var We = function(e, t, n) {
			this.type = "", this.start = t, this.end = 0, e.options.locations && (this.loc = new ce(e, n)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [t, 0]);
		}, U = M.prototype;
		U.startNode = function() {
			return new We(this, this.start, this.startLoc);
		}, U.startNodeAt = function(e, t) {
			return new We(this, e, t);
		};
		function W(e, t, n, r) {
			return e.type = t, e.end = n, this.options.locations && (e.loc.end = r), this.options.ranges && (e.range[1] = n), e;
		}
		U.finishNode = function(e, t) {
			return W.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
		}, U.finishNodeAt = function(e, t, n, r) {
			return W.call(this, e, t, n, r);
		}, U.copyNode = function(e) {
			var t = new We(this, e.start, this.startLoc);
			for (var n in e) t[n] = e[n];
			return t;
		};
		var G = "Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz", Ge = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", K = Ge + " Extended_Pictographic", Ke = K, qe = Ke + " EBase EComp EMod EPres ExtPict", Je = qe, Ye = {
			9: Ge,
			10: K,
			11: Ke,
			12: qe,
			13: Je,
			14: Je
		}, Xe = {
			9: "",
			10: "",
			11: "",
			12: "",
			13: "",
			14: "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji"
		}, Ze = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", Qe = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", $e = Qe + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", et = $e + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", tt = et + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", nt = tt + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", rt = {
			9: Qe,
			10: $e,
			11: et,
			12: tt,
			13: nt,
			14: nt + " " + G
		}, it = {};
		function at(e) {
			var t = it[e] = {
				binary: O(Ye[e] + " " + Ze),
				binaryOfStrings: O(Xe[e]),
				nonBinary: {
					General_Category: O(Ze),
					Script: O(rt[e])
				}
			};
			t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
		}
		for (var ot = 0, st = [
			9,
			10,
			11,
			12,
			13,
			14
		]; ot < st.length; ot += 1) {
			var ct = st[ot];
			at(ct);
		}
		var q = M.prototype, lt = function(e, t) {
			this.parent = e, this.base = t || this;
		};
		lt.prototype.separatedFrom = function(e) {
			for (var t = this; t; t = t.parent) for (var n = e; n; n = n.parent) if (t.base === n.base && t !== n) return !0;
			return !1;
		}, lt.prototype.sibling = function() {
			return new lt(this.parent, this.base);
		};
		var J = function(e) {
			this.parser = e, this.validFlags = "gim" + (e.options.ecmaVersion >= 6 ? "uy" : "") + (e.options.ecmaVersion >= 9 ? "s" : "") + (e.options.ecmaVersion >= 13 ? "d" : "") + (e.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = it[e.options.ecmaVersion >= 14 ? 14 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = Object.create(null), this.backReferenceNames = [], this.branchID = null;
		};
		J.prototype.reset = function(e, t, n) {
			var r = n.indexOf("v") !== -1, i = n.indexOf("u") !== -1;
			this.start = e | 0, this.source = t + "", this.flags = n, r && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = i && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = i && this.parser.options.ecmaVersion >= 9);
		}, J.prototype.raise = function(e) {
			this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e);
		}, J.prototype.at = function(e, t) {
			t === void 0 && (t = !1);
			var n = this.source, r = n.length;
			if (e >= r) return -1;
			var i = n.charCodeAt(e);
			if (!(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r) return i;
			var a = n.charCodeAt(e + 1);
			return a >= 56320 && a <= 57343 ? (i << 10) + a - 56613888 : i;
		}, J.prototype.nextIndex = function(e, t) {
			t === void 0 && (t = !1);
			var n = this.source, r = n.length;
			if (e >= r) return r;
			var i = n.charCodeAt(e), a;
			return !(t || this.switchU) || i <= 55295 || i >= 57344 || e + 1 >= r || (a = n.charCodeAt(e + 1)) < 56320 || a > 57343 ? e + 1 : e + 2;
		}, J.prototype.current = function(e) {
			return e === void 0 && (e = !1), this.at(this.pos, e);
		}, J.prototype.lookahead = function(e) {
			return e === void 0 && (e = !1), this.at(this.nextIndex(this.pos, e), e);
		}, J.prototype.advance = function(e) {
			e === void 0 && (e = !1), this.pos = this.nextIndex(this.pos, e);
		}, J.prototype.eat = function(e, t) {
			return t === void 0 && (t = !1), this.current(t) === e ? (this.advance(t), !0) : !1;
		}, J.prototype.eatChars = function(e, t) {
			t === void 0 && (t = !1);
			for (var n = this.pos, r = 0, i = e; r < i.length; r += 1) {
				var a = i[r], o = this.at(n, t);
				if (o === -1 || o !== a) return !1;
				n = this.nextIndex(n, t);
			}
			return this.pos = n, !0;
		}, q.validateRegExpFlags = function(e) {
			for (var t = e.validFlags, n = e.flags, r = !1, i = !1, a = 0; a < n.length; a++) {
				var o = n.charAt(a);
				t.indexOf(o) === -1 && this.raise(e.start, "Invalid regular expression flag"), n.indexOf(o, a + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag"), o === "u" && (r = !0), o === "v" && (i = !0);
			}
			this.options.ecmaVersion >= 15 && r && i && this.raise(e.start, "Invalid regular expression flag");
		};
		function ut(e) {
			for (var t in e) return !0;
			return !1;
		}
		q.validateRegExpPattern = function(e) {
			this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && ut(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
		}, q.regexp_pattern = function(e) {
			e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"), (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
			for (var t = 0, n = e.backReferenceNames; t < n.length; t += 1) {
				var r = n[t];
				e.groupNames[r] || e.raise("Invalid named capture referenced");
			}
		}, q.regexp_disjunction = function(e) {
			var t = this.options.ecmaVersion >= 16;
			for (t && (e.branchID = new lt(e.branchID, null)), this.regexp_alternative(e); e.eat(124);) t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
			t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(123) && e.raise("Lone quantifier brackets");
		}, q.regexp_alternative = function(e) {
			for (; e.pos < e.source.length && this.regexp_eatTerm(e););
		}, q.regexp_eatTerm = function(e) {
			return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
		}, q.regexp_eatAssertion = function(e) {
			var t = e.pos;
			if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36)) return !0;
			if (e.eat(92)) {
				if (e.eat(66) || e.eat(98)) return !0;
				e.pos = t;
			}
			if (e.eat(40) && e.eat(63)) {
				var n = !1;
				if (this.options.ecmaVersion >= 9 && (n = e.eat(60)), e.eat(61) || e.eat(33)) return this.regexp_disjunction(e), e.eat(41) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !n, !0;
			}
			return e.pos = t, !1;
		}, q.regexp_eatQuantifier = function(e, t) {
			return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1;
		}, q.regexp_eatQuantifierPrefix = function(e, t) {
			return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
		}, q.regexp_eatBracedQuantifier = function(e, t) {
			var n = e.pos;
			if (e.eat(123)) {
				var r = 0, i = -1;
				if (this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue), e.eat(125))) return i !== -1 && i < r && !t && e.raise("numbers out of order in {} quantifier"), !0;
				e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = n;
			}
			return !1;
		}, q.regexp_eatAtom = function(e) {
			return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
		}, q.regexp_eatReverseSolidusAtomEscape = function(e) {
			var t = e.pos;
			if (e.eat(92)) {
				if (this.regexp_eatAtomEscape(e)) return !0;
				e.pos = t;
			}
			return !1;
		}, q.regexp_eatUncapturingGroup = function(e) {
			var t = e.pos;
			if (e.eat(40)) {
				if (e.eat(63)) {
					if (this.options.ecmaVersion >= 16) {
						var n = this.regexp_eatModifiers(e), r = e.eat(45);
						if (n || r) {
							for (var i = 0; i < n.length; i++) {
								var a = n.charAt(i);
								n.indexOf(a, i + 1) > -1 && e.raise("Duplicate regular expression modifiers");
							}
							if (r) {
								var o = this.regexp_eatModifiers(e);
								!n && !o && e.current() === 58 && e.raise("Invalid regular expression modifiers");
								for (var s = 0; s < o.length; s++) {
									var c = o.charAt(s);
									(o.indexOf(c, s + 1) > -1 || n.indexOf(c) > -1) && e.raise("Duplicate regular expression modifiers");
								}
							}
						}
					}
					if (e.eat(58)) {
						if (this.regexp_disjunction(e), e.eat(41)) return !0;
						e.raise("Unterminated group");
					}
				}
				e.pos = t;
			}
			return !1;
		}, q.regexp_eatCapturingGroup = function(e) {
			if (e.eat(40)) {
				if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(41)) return e.numCapturingParens += 1, !0;
				e.raise("Unterminated group");
			}
			return !1;
		}, q.regexp_eatModifiers = function(e) {
			for (var t = "", n = 0; (n = e.current()) !== -1 && dt(n);) t += ae(n), e.advance();
			return t;
		};
		function dt(e) {
			return e === 105 || e === 109 || e === 115;
		}
		q.regexp_eatExtendedAtom = function(e) {
			return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
		}, q.regexp_eatInvalidBracedQuantifier = function(e) {
			return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;
		}, q.regexp_eatSyntaxCharacter = function(e) {
			var t = e.current();
			return ft(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
		};
		function ft(e) {
			return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
		}
		q.regexp_eatPatternCharacters = function(e) {
			for (var t = e.pos, n = 0; (n = e.current()) !== -1 && !ft(n);) e.advance();
			return e.pos !== t;
		}, q.regexp_eatExtendedPatternCharacter = function(e) {
			var t = e.current();
			return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
		}, q.regexp_groupSpecifier = function(e) {
			if (e.eat(63)) {
				this.regexp_eatGroupName(e) || e.raise("Invalid group");
				var t = this.options.ecmaVersion >= 16, n = e.groupNames[e.lastStringValue];
				if (n) if (t) for (var r = 0, i = n; r < i.length; r += 1) i[r].separatedFrom(e.branchID) || e.raise("Duplicate capture group name");
				else e.raise("Duplicate capture group name");
				t ? (n || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
			}
		}, q.regexp_eatGroupName = function(e) {
			if (e.lastStringValue = "", e.eat(60)) {
				if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
				e.raise("Invalid capture group name");
			}
			return !1;
		}, q.regexp_eatRegExpIdentifierName = function(e) {
			if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
				for (e.lastStringValue += ae(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e);) e.lastStringValue += ae(e.lastIntValue);
				return !0;
			}
			return !1;
		}, q.regexp_eatRegExpIdentifierStart = function(e) {
			var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
			return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), pt(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
		};
		function pt(e) {
			return f(e, !0) || e === 36 || e === 95;
		}
		q.regexp_eatRegExpIdentifierPart = function(e) {
			var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
			return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), mt(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
		};
		function mt(e) {
			return p(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
		}
		q.regexp_eatAtomEscape = function(e) {
			return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1);
		}, q.regexp_eatBackReference = function(e) {
			var t = e.pos;
			if (this.regexp_eatDecimalEscape(e)) {
				var n = e.lastIntValue;
				if (e.switchU) return n > e.maxBackReference && (e.maxBackReference = n), !0;
				if (n <= e.numCapturingParens) return !0;
				e.pos = t;
			}
			return !1;
		}, q.regexp_eatKGroupName = function(e) {
			if (e.eat(107)) {
				if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
				e.raise("Invalid named reference");
			}
			return !1;
		}, q.regexp_eatCharacterEscape = function(e) {
			return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
		}, q.regexp_eatCControlLetter = function(e) {
			var t = e.pos;
			if (e.eat(99)) {
				if (this.regexp_eatControlLetter(e)) return !0;
				e.pos = t;
			}
			return !1;
		}, q.regexp_eatZero = function(e) {
			return e.current() === 48 && !wt(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
		}, q.regexp_eatControlEscape = function(e) {
			var t = e.current();
			return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
		}, q.regexp_eatControlLetter = function(e) {
			var t = e.current();
			return ht(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
		};
		function ht(e) {
			return e >= 65 && e <= 90 || e >= 97 && e <= 122;
		}
		q.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
			t === void 0 && (t = !1);
			var n = e.pos, r = t || e.switchU;
			if (e.eat(117)) {
				if (this.regexp_eatFixedHexDigits(e, 4)) {
					var i = e.lastIntValue;
					if (r && i >= 55296 && i <= 56319) {
						var a = e.pos;
						if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
							var o = e.lastIntValue;
							if (o >= 56320 && o <= 57343) return e.lastIntValue = (i - 55296) * 1024 + (o - 56320) + 65536, !0;
						}
						e.pos = a, e.lastIntValue = i;
					}
					return !0;
				}
				if (r && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && gt(e.lastIntValue)) return !0;
				r && e.raise("Invalid unicode escape"), e.pos = n;
			}
			return !1;
		};
		function gt(e) {
			return e >= 0 && e <= 1114111;
		}
		q.regexp_eatIdentityEscape = function(e) {
			if (e.switchU) return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(47) ? (e.lastIntValue = 47, !0) : !1;
			var t = e.current();
			return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
		}, q.regexp_eatDecimalEscape = function(e) {
			e.lastIntValue = 0;
			var t = e.current();
			if (t >= 49 && t <= 57) {
				do
					e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
				while ((t = e.current()) >= 48 && t <= 57);
				return !0;
			}
			return !1;
		};
		var _t = 0, vt = 1, Y = 2;
		q.regexp_eatCharacterClassEscape = function(e) {
			var t = e.current();
			if (yt(t)) return e.lastIntValue = -1, e.advance(), vt;
			var n = !1;
			if (e.switchU && this.options.ecmaVersion >= 9 && ((n = t === 80) || t === 112)) {
				e.lastIntValue = -1, e.advance();
				var r;
				if (e.eat(123) && (r = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(125)) return n && r === Y && e.raise("Invalid property name"), r;
				e.raise("Invalid property name");
			}
			return _t;
		};
		function yt(e) {
			return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
		}
		q.regexp_eatUnicodePropertyValueExpression = function(e) {
			var t = e.pos;
			if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
				var n = e.lastStringValue;
				if (this.regexp_eatUnicodePropertyValue(e)) {
					var r = e.lastStringValue;
					return this.regexp_validateUnicodePropertyNameAndValue(e, n, r), vt;
				}
			}
			if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
				var i = e.lastStringValue;
				return this.regexp_validateUnicodePropertyNameOrValue(e, i);
			}
			return _t;
		}, q.regexp_validateUnicodePropertyNameAndValue = function(e, t, n) {
			ie(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(n) || e.raise("Invalid property value");
		}, q.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
			if (e.unicodeProperties.binary.test(t)) return vt;
			if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return Y;
			e.raise("Invalid property name");
		}, q.regexp_eatUnicodePropertyName = function(e) {
			var t = 0;
			for (e.lastStringValue = ""; X(t = e.current());) e.lastStringValue += ae(t), e.advance();
			return e.lastStringValue !== "";
		};
		function X(e) {
			return ht(e) || e === 95;
		}
		q.regexp_eatUnicodePropertyValue = function(e) {
			var t = 0;
			for (e.lastStringValue = ""; bt(t = e.current());) e.lastStringValue += ae(t), e.advance();
			return e.lastStringValue !== "";
		};
		function bt(e) {
			return X(e) || wt(e);
		}
		q.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
			return this.regexp_eatUnicodePropertyValue(e);
		}, q.regexp_eatCharacterClass = function(e) {
			if (e.eat(91)) {
				var t = e.eat(94), n = this.regexp_classContents(e);
				return e.eat(93) || e.raise("Unterminated character class"), t && n === Y && e.raise("Negated character class may contain strings"), !0;
			}
			return !1;
		}, q.regexp_classContents = function(e) {
			return e.current() === 93 ? vt : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), vt);
		}, q.regexp_nonEmptyClassRanges = function(e) {
			for (; this.regexp_eatClassAtom(e);) {
				var t = e.lastIntValue;
				if (e.eat(45) && this.regexp_eatClassAtom(e)) {
					var n = e.lastIntValue;
					e.switchU && (t === -1 || n === -1) && e.raise("Invalid character class"), t !== -1 && n !== -1 && t > n && e.raise("Range out of order in character class");
				}
			}
		}, q.regexp_eatClassAtom = function(e) {
			var t = e.pos;
			if (e.eat(92)) {
				if (this.regexp_eatClassEscape(e)) return !0;
				if (e.switchU) {
					var n = e.current();
					(n === 99 || Dt(n)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
				}
				e.pos = t;
			}
			var r = e.current();
			return r === 93 ? !1 : (e.lastIntValue = r, e.advance(), !0);
		}, q.regexp_eatClassEscape = function(e) {
			var t = e.pos;
			if (e.eat(98)) return e.lastIntValue = 8, !0;
			if (e.switchU && e.eat(45)) return e.lastIntValue = 45, !0;
			if (!e.switchU && e.eat(99)) {
				if (this.regexp_eatClassControlLetter(e)) return !0;
				e.pos = t;
			}
			return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
		}, q.regexp_classSetExpression = function(e) {
			var t = vt, n;
			if (!this.regexp_eatClassSetRange(e)) if (n = this.regexp_eatClassSetOperand(e)) {
				n === Y && (t = Y);
				for (var r = e.pos; e.eatChars([38, 38]);) {
					if (e.current() !== 38 && (n = this.regexp_eatClassSetOperand(e))) {
						n !== Y && (t = vt);
						continue;
					}
					e.raise("Invalid character in character class");
				}
				if (r !== e.pos) return t;
				for (; e.eatChars([45, 45]);) this.regexp_eatClassSetOperand(e) || e.raise("Invalid character in character class");
				if (r !== e.pos) return t;
			} else e.raise("Invalid character in character class");
			for (;;) if (!this.regexp_eatClassSetRange(e)) {
				if (n = this.regexp_eatClassSetOperand(e), !n) return t;
				n === Y && (t = Y);
			}
		}, q.regexp_eatClassSetRange = function(e) {
			var t = e.pos;
			if (this.regexp_eatClassSetCharacter(e)) {
				var n = e.lastIntValue;
				if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
					var r = e.lastIntValue;
					return n !== -1 && r !== -1 && n > r && e.raise("Range out of order in character class"), !0;
				}
				e.pos = t;
			}
			return !1;
		}, q.regexp_eatClassSetOperand = function(e) {
			return this.regexp_eatClassSetCharacter(e) ? vt : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
		}, q.regexp_eatNestedClass = function(e) {
			var t = e.pos;
			if (e.eat(91)) {
				var n = e.eat(94), r = this.regexp_classContents(e);
				if (e.eat(93)) return n && r === Y && e.raise("Negated character class may contain strings"), r;
				e.pos = t;
			}
			if (e.eat(92)) {
				var i = this.regexp_eatCharacterClassEscape(e);
				if (i) return i;
				e.pos = t;
			}
			return null;
		}, q.regexp_eatClassStringDisjunction = function(e) {
			var t = e.pos;
			if (e.eatChars([92, 113])) {
				if (e.eat(123)) {
					var n = this.regexp_classStringDisjunctionContents(e);
					if (e.eat(125)) return n;
				} else e.raise("Invalid escape");
				e.pos = t;
			}
			return null;
		}, q.regexp_classStringDisjunctionContents = function(e) {
			for (var t = this.regexp_classString(e); e.eat(124);) this.regexp_classString(e) === Y && (t = Y);
			return t;
		}, q.regexp_classString = function(e) {
			for (var t = 0; this.regexp_eatClassSetCharacter(e);) t++;
			return t === 1 ? vt : Y;
		}, q.regexp_eatClassSetCharacter = function(e) {
			var t = e.pos;
			if (e.eat(92)) return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(98) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
			var n = e.current();
			return n < 0 || n === e.lookahead() && xt(n) || St(n) ? !1 : (e.advance(), e.lastIntValue = n, !0);
		};
		function xt(e) {
			return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
		}
		function St(e) {
			return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
		}
		q.regexp_eatClassSetReservedPunctuator = function(e) {
			var t = e.current();
			return Ct(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
		};
		function Ct(e) {
			return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
		}
		q.regexp_eatClassControlLetter = function(e) {
			var t = e.current();
			return wt(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
		}, q.regexp_eatHexEscapeSequence = function(e) {
			var t = e.pos;
			if (e.eat(120)) {
				if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
				e.switchU && e.raise("Invalid escape"), e.pos = t;
			}
			return !1;
		}, q.regexp_eatDecimalDigits = function(e) {
			var t = e.pos, n = 0;
			for (e.lastIntValue = 0; wt(n = e.current());) e.lastIntValue = 10 * e.lastIntValue + (n - 48), e.advance();
			return e.pos !== t;
		};
		function wt(e) {
			return e >= 48 && e <= 57;
		}
		q.regexp_eatHexDigits = function(e) {
			var t = e.pos, n = 0;
			for (e.lastIntValue = 0; Tt(n = e.current());) e.lastIntValue = 16 * e.lastIntValue + Et(n), e.advance();
			return e.pos !== t;
		};
		function Tt(e) {
			return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
		}
		function Et(e) {
			return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
		}
		q.regexp_eatLegacyOctalEscapeSequence = function(e) {
			if (this.regexp_eatOctalDigit(e)) {
				var t = e.lastIntValue;
				if (this.regexp_eatOctalDigit(e)) {
					var n = e.lastIntValue;
					t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + n * 8 + e.lastIntValue : e.lastIntValue = t * 8 + n;
				} else e.lastIntValue = t;
				return !0;
			}
			return !1;
		}, q.regexp_eatOctalDigit = function(e) {
			var t = e.current();
			return Dt(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
		};
		function Dt(e) {
			return e >= 48 && e <= 55;
		}
		q.regexp_eatFixedHexDigits = function(e, t) {
			var n = e.pos;
			e.lastIntValue = 0;
			for (var r = 0; r < t; ++r) {
				var i = e.current();
				if (!Tt(i)) return e.pos = n, !1;
				e.lastIntValue = 16 * e.lastIntValue + Et(i), e.advance();
			}
			return !0;
		};
		var Z = function(e) {
			this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new ce(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
		}, Q = M.prototype;
		Q.next = function(e) {
			!e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Z(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
		}, Q.getToken = function() {
			return this.next(), new Z(this);
		}, typeof Symbol < "u" && (Q[Symbol.iterator] = function() {
			var e = this;
			return { next: function() {
				var t = e.getToken();
				return {
					done: t.type === y.eof,
					value: t
				};
			} };
		}), Q.nextToken = function() {
			var e = this.curContext();
			if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length) return this.finishToken(y.eof);
			if (e.override) return e.override(this);
			this.readToken(this.fullCharCodeAtPos());
		}, Q.readToken = function(e) {
			return f(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
		}, Q.fullCharCodeAt = function(e) {
			var t = this.input.charCodeAt(e);
			if (t <= 55295 || t >= 56320) return t;
			var n = this.input.charCodeAt(e + 1);
			return n <= 56319 || n >= 57344 ? t : (t << 10) + n - 56613888;
		}, Q.fullCharCodeAtPos = function() {
			return this.fullCharCodeAt(this.pos);
		}, Q.skipBlockComment = function() {
			var e = this.options.onComment && this.curPosition(), t = this.pos, n = this.input.indexOf("*/", this.pos += 2);
			if (n === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = n + 2, this.options.locations) for (var r = void 0, i = t; (r = x(this.input, i, this.pos)) > -1;) ++this.curLine, i = this.lineStart = r;
			this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, n), t, this.pos, e, this.curPosition());
		}, Q.skipLineComment = function(e) {
			for (var t = this.pos, n = this.options.onComment && this.curPosition(), r = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !ne(r);) r = this.input.charCodeAt(++this.pos);
			this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, n, this.curPosition());
		}, Q.skipSpace = function() {
			loop: for (; this.pos < this.input.length;) {
				var e = this.input.charCodeAt(this.pos);
				switch (e) {
					case 32:
					case 160:
						++this.pos;
						break;
					case 13: this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
					case 10:
					case 8232:
					case 8233:
						++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
						break;
					case 47:
						switch (this.input.charCodeAt(this.pos + 1)) {
							case 42:
								this.skipBlockComment();
								break;
							case 47:
								this.skipLineComment(2);
								break;
							default: break loop;
						}
						break;
					default: if (e > 8 && e < 14 || e >= 5760 && re.test(String.fromCharCode(e))) ++this.pos;
					else break loop;
				}
			}
		}, Q.finishToken = function(e, t) {
			this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
			var n = this.type;
			this.type = e, this.value = t, this.updateContext(n);
		}, Q.readToken_dot = function() {
			var e = this.input.charCodeAt(this.pos + 1);
			if (e >= 48 && e <= 57) return this.readNumber(!0);
			var t = this.input.charCodeAt(this.pos + 2);
			return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(y.ellipsis)) : (++this.pos, this.finishToken(y.dot));
		}, Q.readToken_slash = function() {
			var e = this.input.charCodeAt(this.pos + 1);
			return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(y.assign, 2) : this.finishOp(y.slash, 1);
		}, Q.readToken_mult_modulo_exp = function(e) {
			var t = this.input.charCodeAt(this.pos + 1), n = 1, r = e === 42 ? y.star : y.modulo;
			return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++n, r = y.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(y.assign, n + 1) : this.finishOp(r, n);
		}, Q.readToken_pipe_amp = function(e) {
			var t = this.input.charCodeAt(this.pos + 1);
			return t === e ? this.options.ecmaVersion >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(y.assign, 3) : this.finishOp(e === 124 ? y.logicalOR : y.logicalAND, 2) : t === 61 ? this.finishOp(y.assign, 2) : this.finishOp(e === 124 ? y.bitwiseOR : y.bitwiseAND, 1);
		}, Q.readToken_caret = function() {
			return this.input.charCodeAt(this.pos + 1) === 61 ? this.finishOp(y.assign, 2) : this.finishOp(y.bitwiseXOR, 1);
		}, Q.readToken_plus_min = function(e) {
			var t = this.input.charCodeAt(this.pos + 1);
			return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || b.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(y.incDec, 2) : t === 61 ? this.finishOp(y.assign, 2) : this.finishOp(y.plusMin, 1);
		}, Q.readToken_lt_gt = function(e) {
			var t = this.input.charCodeAt(this.pos + 1), n = 1;
			return t === e ? (n = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(y.assign, n + 1) : this.finishOp(y.bitShift, n)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (n = 2), this.finishOp(y.relational, n));
		}, Q.readToken_eq_excl = function(e) {
			var t = this.input.charCodeAt(this.pos + 1);
			return t === 61 ? this.finishOp(y.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(y.arrow)) : this.finishOp(e === 61 ? y.eq : y.prefix, 1);
		}, Q.readToken_question = function() {
			var e = this.options.ecmaVersion;
			if (e >= 11) {
				var t = this.input.charCodeAt(this.pos + 1);
				if (t === 46) {
					var n = this.input.charCodeAt(this.pos + 2);
					if (n < 48 || n > 57) return this.finishOp(y.questionDot, 2);
				}
				if (t === 63) return e >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(y.assign, 3) : this.finishOp(y.coalesce, 2);
			}
			return this.finishOp(y.question, 1);
		}, Q.readToken_numberSign = function() {
			var e = this.options.ecmaVersion, t = 35;
			if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), f(t, !0) || t === 92)) return this.finishToken(y.privateId, this.readWord1());
			this.raise(this.pos, "Unexpected character '" + ae(t) + "'");
		}, Q.getTokenFromCode = function(e) {
			switch (e) {
				case 46: return this.readToken_dot();
				case 40: return ++this.pos, this.finishToken(y.parenL);
				case 41: return ++this.pos, this.finishToken(y.parenR);
				case 59: return ++this.pos, this.finishToken(y.semi);
				case 44: return ++this.pos, this.finishToken(y.comma);
				case 91: return ++this.pos, this.finishToken(y.bracketL);
				case 93: return ++this.pos, this.finishToken(y.bracketR);
				case 123: return ++this.pos, this.finishToken(y.braceL);
				case 125: return ++this.pos, this.finishToken(y.braceR);
				case 58: return ++this.pos, this.finishToken(y.colon);
				case 96:
					if (this.options.ecmaVersion < 6) break;
					return ++this.pos, this.finishToken(y.backQuote);
				case 48:
					var t = this.input.charCodeAt(this.pos + 1);
					if (t === 120 || t === 88) return this.readRadixNumber(16);
					if (this.options.ecmaVersion >= 6) {
						if (t === 111 || t === 79) return this.readRadixNumber(8);
						if (t === 98 || t === 66) return this.readRadixNumber(2);
					}
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57: return this.readNumber(!1);
				case 34:
				case 39: return this.readString(e);
				case 47: return this.readToken_slash();
				case 37:
				case 42: return this.readToken_mult_modulo_exp(e);
				case 124:
				case 38: return this.readToken_pipe_amp(e);
				case 94: return this.readToken_caret();
				case 43:
				case 45: return this.readToken_plus_min(e);
				case 60:
				case 62: return this.readToken_lt_gt(e);
				case 61:
				case 33: return this.readToken_eq_excl(e);
				case 63: return this.readToken_question();
				case 126: return this.finishOp(y.prefix, 1);
				case 35: return this.readToken_numberSign();
			}
			this.raise(this.pos, "Unexpected character '" + ae(e) + "'");
		}, Q.finishOp = function(e, t) {
			var n = this.input.slice(this.pos, this.pos + t);
			return this.pos += t, this.finishToken(e, n);
		}, Q.readRegexp = function() {
			for (var e, t, n = this.pos;;) {
				this.pos >= this.input.length && this.raise(n, "Unterminated regular expression");
				var r = this.input.charAt(this.pos);
				if (b.test(r) && this.raise(n, "Unterminated regular expression"), e) e = !1;
				else {
					if (r === "[") t = !0;
					else if (r === "]" && t) t = !1;
					else if (r === "/" && !t) break;
					e = r === "\\";
				}
				++this.pos;
			}
			var i = this.input.slice(n, this.pos);
			++this.pos;
			var a = this.pos, o = this.readWord1();
			this.containsEsc && this.unexpected(a);
			var s = this.regexpState ||= new J(this);
			s.reset(n, i, o), this.validateRegExpFlags(s), this.validateRegExpPattern(s);
			var c = null;
			try {
				c = new RegExp(i, o);
			} catch {}
			return this.finishToken(y.regexp, {
				pattern: i,
				flags: o,
				value: c
			});
		}, Q.readInt = function(e, t, n) {
			for (var r = this.options.ecmaVersion >= 12 && t === void 0, i = n && this.input.charCodeAt(this.pos) === 48, a = this.pos, o = 0, s = 0, c = 0, l = t ?? Infinity; c < l; ++c, ++this.pos) {
				var u = this.input.charCodeAt(this.pos), d = void 0;
				if (r && u === 95) {
					i && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), s === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), c === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), s = u;
					continue;
				}
				if (d = u >= 97 ? u - 97 + 10 : u >= 65 ? u - 65 + 10 : u >= 48 && u <= 57 ? u - 48 : Infinity, d >= e) break;
				s = u, o = o * e + d;
			}
			return r && s === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === a || t != null && this.pos - a !== t ? null : o;
		};
		function Ot(e, t) {
			return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
		}
		function kt(e) {
			return typeof BigInt == "function" ? BigInt(e.replace(/_/g, "")) : null;
		}
		Q.readRadixNumber = function(e) {
			var t = this.pos;
			this.pos += 2;
			var n = this.readInt(e);
			return n ?? this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = kt(this.input.slice(t, this.pos)), ++this.pos) : f(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(y.num, n);
		}, Q.readNumber = function(e) {
			var t = this.pos;
			!e && this.readInt(10, void 0, !0) === null && this.raise(t, "Invalid number");
			var n = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
			n && this.strict && this.raise(t, "Invalid number");
			var r = this.input.charCodeAt(this.pos);
			if (!n && !e && this.options.ecmaVersion >= 11 && r === 110) {
				var i = kt(this.input.slice(t, this.pos));
				return ++this.pos, f(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(y.num, i);
			}
			n && /[89]/.test(this.input.slice(t, this.pos)) && (n = !1), r === 46 && !n && (++this.pos, this.readInt(10), r = this.input.charCodeAt(this.pos)), (r === 69 || r === 101) && !n && (r = this.input.charCodeAt(++this.pos), (r === 43 || r === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, "Invalid number")), f(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
			var a = Ot(this.input.slice(t, this.pos), n);
			return this.finishToken(y.num, a);
		}, Q.readCodePoint = function() {
			var e = this.input.charCodeAt(this.pos), t;
			if (e === 123) {
				this.options.ecmaVersion < 6 && this.unexpected();
				var n = ++this.pos;
				t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(n, "Code point out of bounds");
			} else t = this.readHexChar(4);
			return t;
		}, Q.readString = function(e) {
			for (var t = "", n = ++this.pos;;) {
				this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
				var r = this.input.charCodeAt(this.pos);
				if (r === e) break;
				r === 92 ? (t += this.input.slice(n, this.pos), t += this.readEscapedChar(!1), n = this.pos) : r === 8232 || r === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (ne(r) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
			}
			return t += this.input.slice(n, this.pos++), this.finishToken(y.string, t);
		};
		var At = {};
		Q.tryReadTemplateToken = function() {
			this.inTemplateElement = !0;
			try {
				this.readTmplToken();
			} catch (e) {
				if (e === At) this.readInvalidTemplateToken();
				else throw e;
			}
			this.inTemplateElement = !1;
		}, Q.invalidStringToken = function(e, t) {
			if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw At;
			this.raise(e, t);
		}, Q.readTmplToken = function() {
			for (var e = "", t = this.pos;;) {
				this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
				var n = this.input.charCodeAt(this.pos);
				if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123) return this.pos === this.start && (this.type === y.template || this.type === y.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(y.dollarBraceL)) : (++this.pos, this.finishToken(y.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(y.template, e));
				if (n === 92) e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
				else if (ne(n)) {
					switch (e += this.input.slice(t, this.pos), ++this.pos, n) {
						case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
						case 10:
							e += "\n";
							break;
						default:
							e += String.fromCharCode(n);
							break;
					}
					this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
				} else ++this.pos;
			}
		}, Q.readInvalidTemplateToken = function() {
			for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
				case "\\":
					++this.pos;
					break;
				case "$": if (this.input[this.pos + 1] !== "{") break;
				case "`": return this.finishToken(y.invalidTemplate, this.input.slice(this.start, this.pos));
				case "\r": this.input[this.pos + 1] === "\n" && ++this.pos;
				case "\n":
				case "\u2028":
				case "\u2029":
					++this.curLine, this.lineStart = this.pos + 1;
					break;
			}
			this.raise(this.start, "Unterminated template");
		}, Q.readEscapedChar = function(e) {
			var t = this.input.charCodeAt(++this.pos);
			switch (++this.pos, t) {
				case 110: return "\n";
				case 114: return "\r";
				case 120: return String.fromCharCode(this.readHexChar(2));
				case 117: return ae(this.readCodePoint());
				case 116: return "	";
				case 98: return "\b";
				case 118: return "\v";
				case 102: return "\f";
				case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
				case 10: return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
				case 56:
				case 57: if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"), e) {
					var n = this.pos - 1;
					this.invalidStringToken(n, "Invalid escape sequence in template string");
				}
				default:
					if (t >= 48 && t <= 55) {
						var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], i = parseInt(r, 8);
						return i > 255 && (r = r.slice(0, -1), i = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(this.pos), (r !== "0" || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(this.pos - 1 - r.length, e ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(i);
					}
					return ne(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(t);
			}
		}, Q.readHexChar = function(e) {
			var t = this.pos, n = this.readInt(16, e);
			return n === null && this.invalidStringToken(t, "Bad character escape sequence"), n;
		}, Q.readWord1 = function() {
			this.containsEsc = !1;
			for (var e = "", t = !0, n = this.pos, r = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {
				var i = this.fullCharCodeAtPos();
				if (p(i, r)) this.pos += i <= 65535 ? 1 : 2;
				else if (i === 92) {
					this.containsEsc = !0, e += this.input.slice(n, this.pos);
					var a = this.pos;
					this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
					var o = this.readCodePoint();
					(t ? f : p)(o, r) || this.invalidStringToken(a, "Invalid Unicode escape"), e += ae(o), n = this.pos;
				} else break;
				t = !1;
			}
			return e + this.input.slice(n, this.pos);
		}, Q.readWord = function() {
			var e = this.readWord1(), t = y.name;
			return this.keywords.test(e) && (t = ee[e]), this.finishToken(t, e);
		};
		var jt = "8.17.0";
		M.acorn = {
			Parser: M,
			version: jt,
			defaultOptions: le,
			Position: se,
			SourceLocation: ce,
			getLineInfo: k,
			Node: We,
			TokenType: m,
			tokTypes: y,
			keywordTypes: ee,
			TokContext: z,
			tokContexts: B,
			isIdentifierChar: p,
			isIdentifierStart: f,
			Token: Z,
			isNewLine: ne,
			lineBreak: b,
			lineBreakG: te,
			nonASCIIwhitespace: re
		};
		function Mt(e, t) {
			return M.parse(e, t);
		}
		function Nt(e, t, n) {
			return M.parseExpressionAt(e, t, n);
		}
		function Pt(e, t) {
			return M.tokenizer(e, t);
		}
		e.Node = We, e.Parser = M, e.Position = se, e.SourceLocation = ce, e.TokContext = z, e.Token = Z, e.TokenType = m, e.defaultOptions = le, e.getLineInfo = k, e.isIdentifierChar = p, e.isIdentifierStart = f, e.isNewLine = ne, e.keywordTypes = ee, e.lineBreak = b, e.lineBreakG = te, e.nonASCIIwhitespace = re, e.parse = Mt, e.parseExpressionAt = Nt, e.tokContexts = B, e.tokTypes = y, e.tokenizer = Pt, e.version = jt;
	}));
})), Wt = /* @__PURE__ */ f((/* @__PURE__ */ u(((e, t) => {
	var n = Ht(), r = /^[\da-fA-F]+$/, i = /^\d+$/, a = /* @__PURE__ */ new WeakMap();
	function o(e) {
		e = e.Parser.acorn || e;
		let t = a.get(e);
		if (!t) {
			let n = e.tokTypes, r = e.TokContext, i = e.TokenType, o = new r("<tag", !1), s = new r("</tag", !1), c = new r("<tag>...</tag>", !0, !0), l = {
				tc_oTag: o,
				tc_cTag: s,
				tc_expr: c
			}, u = {
				jsxName: new i("jsxName"),
				jsxText: new i("jsxText", { beforeExpr: !0 }),
				jsxTagStart: new i("jsxTagStart", { startsExpr: !0 }),
				jsxTagEnd: new i("jsxTagEnd")
			};
			u.jsxTagStart.updateContext = function() {
				this.context.push(c), this.context.push(o), this.exprAllowed = !1;
			}, u.jsxTagEnd.updateContext = function(e) {
				let t = this.context.pop();
				t === o && e === n.slash || t === s ? (this.context.pop(), this.exprAllowed = this.curContext() === c) : this.exprAllowed = !0;
			}, t = {
				tokContexts: l,
				tokTypes: u
			}, a.set(e, t);
		}
		return t;
	}
	function s(e) {
		if (!e) return e;
		if (e.type === "JSXIdentifier") return e.name;
		if (e.type === "JSXNamespacedName") return e.namespace.name + ":" + e.name.name;
		if (e.type === "JSXMemberExpression") return s(e.object) + "." + s(e.property);
	}
	t.exports = function(e) {
		return e ||= {}, function(t) {
			return c({
				allowNamespaces: e.allowNamespaces !== !1,
				allowNamespacedObjects: !!e.allowNamespacedObjects,
				autoCloseVoidElements: !!e.autoCloseVoidElements
			}, t);
		};
	}, Object.defineProperty(t.exports, "tokTypes", {
		get: function() {
			return o(Ut()).tokTypes;
		},
		configurable: !0,
		enumerable: !0
	});
	function c(e, t) {
		let a = t.acorn || Ut(), c = o(a), l = a.tokTypes, u = c.tokTypes, d = a.tokContexts, f = c.tokContexts.tc_oTag, p = c.tokContexts.tc_cTag, m = c.tokContexts.tc_expr, h = a.isNewLine, g = a.isIdentifierStart, _ = a.isIdentifierChar;
		return class extends t {
			static get acornJsx() {
				return c;
			}
			jsx_readToken() {
				let e = "", t = this.pos;
				for (;;) {
					this.pos >= this.input.length && this.raise(this.start, "Unterminated JSX contents");
					let n = this.input.charCodeAt(this.pos);
					switch (n) {
						case 60:
						case 123: return this.pos === this.start ? n === 60 && this.exprAllowed ? (++this.pos, this.finishToken(u.jsxTagStart)) : this.getTokenFromCode(n) : (e += this.input.slice(t, this.pos), this.finishToken(u.jsxText, e));
						case 38:
							e += this.input.slice(t, this.pos), e += this.jsx_readEntity(), t = this.pos;
							break;
						case 62:
						case 125: this.raise(this.pos, "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (n === 62 ? "&gt;" : "&rbrace;") + "` or `{\"" + this.input[this.pos] + "\"}`?");
						default: h(n) ? (e += this.input.slice(t, this.pos), e += this.jsx_readNewLine(!0), t = this.pos) : ++this.pos;
					}
				}
			}
			jsx_readNewLine(e) {
				let t = this.input.charCodeAt(this.pos), n;
				return ++this.pos, t === 13 && this.input.charCodeAt(this.pos) === 10 ? (++this.pos, n = e ? "\n" : "\r\n") : n = String.fromCharCode(t), this.options.locations && (++this.curLine, this.lineStart = this.pos), n;
			}
			jsx_readString(e) {
				let t = "", n = ++this.pos;
				for (;;) {
					this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
					let r = this.input.charCodeAt(this.pos);
					if (r === e) break;
					r === 38 ? (t += this.input.slice(n, this.pos), t += this.jsx_readEntity(), n = this.pos) : h(r) ? (t += this.input.slice(n, this.pos), t += this.jsx_readNewLine(!1), n = this.pos) : ++this.pos;
				}
				return t += this.input.slice(n, this.pos++), this.finishToken(l.string, t);
			}
			jsx_readEntity() {
				let e = "", t = 0, a, o = this.input[this.pos];
				o !== "&" && this.raise(this.pos, "Entity must start with an ampersand");
				let s = ++this.pos;
				for (; this.pos < this.input.length && t++ < 10;) {
					if (o = this.input[this.pos++], o === ";") {
						e[0] === "#" ? e[1] === "x" ? (e = e.substr(2), r.test(e) && (a = String.fromCharCode(parseInt(e, 16)))) : (e = e.substr(1), i.test(e) && (a = String.fromCharCode(parseInt(e, 10)))) : a = n[e];
						break;
					}
					e += o;
				}
				return a || (this.pos = s, "&");
			}
			jsx_readWord() {
				let e, t = this.pos;
				do
					e = this.input.charCodeAt(++this.pos);
				while (_(e) || e === 45);
				return this.finishToken(u.jsxName, this.input.slice(t, this.pos));
			}
			jsx_parseIdentifier() {
				let e = this.startNode();
				return this.type === u.jsxName ? e.name = this.value : this.type.keyword ? e.name = this.type.keyword : this.unexpected(), this.next(), this.finishNode(e, "JSXIdentifier");
			}
			jsx_parseNamespacedName() {
				let t = this.start, n = this.startLoc, r = this.jsx_parseIdentifier();
				if (!e.allowNamespaces || !this.eat(l.colon)) return r;
				var i = this.startNodeAt(t, n);
				return i.namespace = r, i.name = this.jsx_parseIdentifier(), this.finishNode(i, "JSXNamespacedName");
			}
			jsx_parseElementName() {
				if (this.type === u.jsxTagEnd) return "";
				let t = this.start, n = this.startLoc, r = this.jsx_parseNamespacedName();
				for (this.type === l.dot && r.type === "JSXNamespacedName" && !e.allowNamespacedObjects && this.unexpected(); this.eat(l.dot);) {
					let e = this.startNodeAt(t, n);
					e.object = r, e.property = this.jsx_parseIdentifier(), r = this.finishNode(e, "JSXMemberExpression");
				}
				return r;
			}
			jsx_parseAttributeValue() {
				switch (this.type) {
					case l.braceL:
						let e = this.jsx_parseExpressionContainer();
						return e.expression.type === "JSXEmptyExpression" && this.raise(e.start, "JSX attributes must only be assigned a non-empty expression"), e;
					case u.jsxTagStart:
					case l.string: return this.parseExprAtom();
					default: this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
				}
			}
			jsx_parseEmptyExpression() {
				let e = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
				return this.finishNodeAt(e, "JSXEmptyExpression", this.start, this.startLoc);
			}
			jsx_parseExpressionContainer() {
				let e = this.startNode();
				return this.next(), e.expression = this.type === l.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression(), this.expect(l.braceR), this.finishNode(e, "JSXExpressionContainer");
			}
			jsx_parseAttribute() {
				let e = this.startNode();
				return this.eat(l.braceL) ? (this.expect(l.ellipsis), e.argument = this.parseMaybeAssign(), this.expect(l.braceR), this.finishNode(e, "JSXSpreadAttribute")) : (e.name = this.jsx_parseNamespacedName(), e.value = this.eat(l.eq) ? this.jsx_parseAttributeValue() : null, this.finishNode(e, "JSXAttribute"));
			}
			jsx_parseOpeningElementAt(t, n) {
				let r = this.startNodeAt(t, n);
				r.attributes = [];
				let i = this.jsx_parseElementName();
				for (i && (r.name = i); this.type !== l.slash && this.type !== u.jsxTagEnd;) r.attributes.push(this.jsx_parseAttribute());
				return r.selfClosing = this.eat(l.slash), this.expect(u.jsxTagEnd), e.autoCloseVoidElements && i && [
					"area",
					"base",
					"br",
					"col",
					"embed",
					"hr",
					"img",
					"input",
					"keygen",
					"link",
					"menuitem",
					"meta",
					"param",
					"source",
					"track",
					"wbr"
				].includes(i.name) && (r.selfClosing = !0), this.finishNode(r, i ? "JSXOpeningElement" : "JSXOpeningFragment");
			}
			jsx_parseClosingElementAt(e, t) {
				let n = this.startNodeAt(e, t), r = this.jsx_parseElementName();
				return r && (n.name = r), this.expect(u.jsxTagEnd), this.finishNode(n, r ? "JSXClosingElement" : "JSXClosingFragment");
			}
			jsx_parseElementAt(e, t) {
				let n = this.startNodeAt(e, t), r = [], i = this.jsx_parseOpeningElementAt(e, t), a = null;
				if (!i.selfClosing) {
					contents: for (;;) switch (this.type) {
						case u.jsxTagStart:
							if (e = this.start, t = this.startLoc, this.next(), this.eat(l.slash)) {
								a = this.jsx_parseClosingElementAt(e, t);
								break contents;
							}
							r.push(this.jsx_parseElementAt(e, t));
							break;
						case u.jsxText:
							r.push(this.parseExprAtom());
							break;
						case l.braceL:
							r.push(this.jsx_parseExpressionContainer());
							break;
						default: this.unexpected();
					}
					s(a.name) !== s(i.name) && this.raise(a.start, "Expected corresponding JSX closing tag for <" + s(i.name) + ">");
				}
				let o = i.name ? "Element" : "Fragment";
				return n["opening" + o] = i, n["closing" + o] = a, n.children = r, this.type === l.relational && this.value === "<" && this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag"), this.finishNode(n, "JSX" + o);
			}
			jsx_parseText() {
				let e = this.parseLiteral(this.value);
				return e.type = "JSXText", e;
			}
			jsx_parseElement() {
				let e = this.start, t = this.startLoc;
				return this.next(), this.jsx_parseElementAt(e, t);
			}
			parseExprAtom(e) {
				return this.type === u.jsxText ? this.jsx_parseText() : this.type === u.jsxTagStart ? this.jsx_parseElement() : super.parseExprAtom(e);
			}
			readToken(e) {
				let t = this.curContext();
				if (t === m) return this.jsx_readToken();
				if (t === f || t === p) {
					if (g(e)) return this.jsx_readWord();
					if (e == 62) return ++this.pos, this.finishToken(u.jsxTagEnd);
					if ((e === 34 || e === 39) && t == f) return this.jsx_readString(e);
				}
				return e === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33 ? (++this.pos, this.finishToken(u.jsxTagStart)) : super.readToken(e);
			}
			updateContext(e) {
				if (this.type == l.braceL) {
					var t = this.curContext();
					t == f ? this.context.push(d.b_expr) : t == m ? this.context.push(d.b_tmpl) : super.updateContext(e), this.exprAllowed = !0;
				} else if (this.type === l.slash && e === u.jsxTagStart) this.context.length -= 2, this.context.push(p), this.exprAllowed = !1;
				else return super.updateContext(e);
			}
		};
	}
})))(), 1), Gt = class e extends Error {
	type;
	sourceInfo;
	snippet;
	cause;
	constructor(t, n) {
		super(t), this.name = "JsxParserError", this.type = n.type, this.sourceInfo = n.sourceInfo, this.snippet = n.snippet, this.cause = n.cause, Object.setPrototypeOf(this, e.prototype);
	}
};
function Kt(e) {
	let t = e.filter((e) => !e.startsWith("{")).reduce((e, t) => {
		let n = t.match(/^(\s*)\S+/)?.[1];
		return n ? Math.min(n.length, e ?? Infinity) : e;
	}, void 0);
	return e.map((e) => e.replace(RegExp(`^\\s{${t ?? 0}}`), ""));
}
function qt(e, t) {
	let n = Math.max(0, t - 3), r = Math.min(e.length, t + 2);
	return `~~~jsx\n${e.slice(n, r).map((e, r) => {
		let i = n + r + 1;
		return `${i === t ? ">>> " : "    "}${i}: ${e}`;
	}).join("\n")}\n~~~`;
}
function Jt(e, t, n) {
	return `**${e}**\n\n${t}\n${n}`;
}
function Yt(e, t, n) {
	let r = Math.max(0, t), i = e.slice(0, r);
	return {
		line: i.split("\n").length,
		column: r - (i.lastIndexOf("\n") + 1),
		startOffset: r,
		endOffset: Math.max(r, n)
	};
}
function Xt({ type: e, message: t, source: n, start: r, end: i, fileName: a, cause: o, astNode: s, loopIndex: c }) {
	let l = Yt(n, r, i), u = qt(n.split("\n"), l.line);
	return new Gt(Jt(t, `Error occurred at line \`${l.line}\`${a ? ` of \`${a}\`` : ""}:`, u), {
		type: e,
		snippet: u,
		cause: o,
		sourceInfo: {
			fileName: a,
			source: n.slice(l.startOffset, l.endOffset),
			location: l,
			loopIndex: c,
			astNode: s
		}
	});
}
function Zt(e) {
	let { type: t, message: n, bodyLines: r, line: i, functionName: a, fileName: o, cause: s, sourceText: c, startOffset: l, endOffset: u } = e, d = qt(r, i), f = `line \`${i}\`${o ? ` of \`${o}\`` : ""}`, p = a ? `Error occurred in dynamic function \`${a}\` at ${f}:` : `Error occurred at ${f}:`, m = c !== void 0 && l !== void 0 && u !== void 0, h = m ? Yt(c, l, u) : { line: i }, g = m ? c.slice(h.startOffset, h.endOffset) : r[i - 1];
	return new Gt(Jt(n, p, d), {
		type: t,
		snippet: d,
		cause: s,
		sourceInfo: {
			fileName: o,
			source: g,
			location: h,
			loopIndex: void 0,
			astNode: void 0
		}
	});
}
function Qt(e) {
	let t = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#039;"
	};
	return e.replace(/[&<>"']/g, (e) => t[e]);
}
//#endregion
//#region source/helpers/functionUtilities.ts
function $t(e) {
	return e.type === "SpreadElement";
}
var en = " const __jsxRenderContext__ = this;\r\n";
function tn(e) {
	let t = /* @__PURE__ */ new Set(), n = (e, r = /* @__PURE__ */ new Set()) => {
		if (e) switch (e.type) {
			case "Identifier":
				r.has(e.name) || t.add(e.name);
				break;
			case "ArrayExpression":
				(e.elements || []).forEach((e) => {
					if ($t(e)) {
						n(e.argument, r);
						return;
					}
					n(e, r);
				});
				break;
			case "ArrowFunctionExpression":
				let i = new Set(r.values());
				e.params.flatMap((e) => {
					switch (e.type) {
						case "Identifier":
						case "MemberExpression": return e.name;
						case "ObjectPattern": return e.properties.map((e) => {
							switch (e.type) {
								case "Property": return e.key.name;
								case "RestElement": return e.argument.name;
								default: return;
							}
						});
						case "ArrayPattern": return e.elements.map((e) => {
							if (e) switch (e.type) {
								case "Identifier": return e.name;
								case "RestElement": return e.argument.name;
								default: return;
							}
						});
						default: return;
					}
				}).forEach((e) => {
					e && i.add(e);
				}), n(e.body, i);
				break;
			case "BinaryExpression":
				n(e.left, r), n(e.right, r);
				break;
			case "CallExpression":
				n(e.callee, r), (e.arguments || []).forEach((e) => n(e, r));
				break;
			case "ChainExpression":
				n(e.expression, r);
				break;
			case "ConditionalExpression":
				n(e.test, r), n(e.consequent, r), n(e.alternate, r);
				break;
			case "ExpressionStatement":
				n(e.expression, r);
				break;
			case "JSXElement":
				(e.openingElement.attributes || []).forEach((e) => {
					e.type === "JSXAttribute" && n(e.value, r);
				}), (e.children || []).forEach((e) => {
					n(e, r);
				});
				break;
			case "JSXFragment":
				(e.children || []).forEach((e) => n(e, r));
				break;
			case "JSXExpressionContainer":
				n(e.expression, r);
				break;
			case "LogicalExpression":
				n(e.left, r), n(e.right, r);
				break;
			case "MemberExpression":
				n(e.object, r);
				break;
			case "NewExpression":
				n(e.callee, r), (e.arguments || []).forEach((e) => n(e, r));
				break;
			case "ObjectExpression":
				(e.properties || []).forEach((e) => {
					if ($t(e)) {
						n(e.argument, r);
						return;
					}
					n(e.value, r);
				});
				break;
			case "TemplateLiteral":
				(e.expressions || []).forEach((e) => {
					n(e, r);
				});
				break;
		}
	};
	return n(e), Array.from(t.values());
}
function nn(e, t, n, r = 0) {
	let i = I.extend(Wt.default({ autoCloseVoidElements: !0 })).parse(e, { ecmaVersion: "latest" });
	return (a) => n(e, i.body[0], {
		...t,
		...a
	}, r);
}
function rn(e) {
	let t = I.extend(Wt.default({ autoCloseVoidElements: !0 })).parse(`function dummy() ${e}`, { ecmaVersion: "latest" }), n = [], r = (e) => {
		if (e) switch (e.type) {
			case "JSXElement":
			case "JSXFragment":
				n.push({
					...e,
					start: e.start - 17,
					end: e.end - 17
				});
				break;
			default: Object.values(e).forEach((e) => {
				e && typeof e == "object" && r(e);
			});
		}
	};
	return r(t), n;
}
function an(e, t, n, r = (e) => e) {
	let i = {}, a = [];
	if (rn(e).forEach((o, s) => {
		let c = `renderJSXElementWrapper_${s}`;
		i[c] = nn(e.slice(o.start, o.end), t, n, r(o.start));
		let l = e.slice(o.start, o.end), u = l.split("\n").length - 1;
		a.push([l, `__jsxRenderContext__.${c}({ ${tn(o).join(", ")} })${"\n".repeat(u)}`]);
	}), !a.length) return [e, {}];
	let o = `{${en}${e.slice(1)}`;
	return a.forEach(([e, t]) => {
		o = o.replace(e, t);
	}), [o, i];
}
function on(e, t, n = "anonymous", r, i, a, o) {
	let s = `dynamic-${n}-${Math.random().toString(36).substring(2, 9)}.js`, c = t.match(/^\{{1}([\S\s]*)\}{1}$/)?.[1] ?? t;
	c = c.replace(/^\n+|\n+$/g, "");
	let l = `//# sourceURL=${s}\n${c}`, u = Function(...e, l);
	return function(...e) {
		try {
			return u.apply(this, e);
		} catch (e) {
			let l = e.stack.split("\n").find((e) => e.includes(s)), u = parseInt(l?.match(/:(\d+):/)?.[1], 10) - 3, d = Kt(c.split("\n")), f = c.split("\n"), p, m;
			if (a && o !== void 0 && Number.isFinite(u) && u >= 1 && u <= f.length) {
				let e = t.match(/^\{{1}([\S\s]*)\}{1}$/), n = e?.[1] ?? t;
				if (n.startsWith(" const __jsxRenderContext__ = this;\r\n")) {
					let e = a(0), t = Yt(o, e, e).line + u - 2, n = o.split("\n");
					t >= 1 && t <= n.length && (p = n.slice(0, t - 1).reduce((e, t) => e + t.length + 1, 0), m = p + n[t - 1].length);
				} else {
					let t = +!!e + (n.match(/^\n+/)?.[0].length ?? 0), r = f.slice(0, u - 1).reduce((e, t) => e + t.length + 1, 0);
					p = a(r + t), m = a(r + f[u - 1].length + t);
				}
			}
			let h = Zt({
				type: "function-runtime",
				message: e.message,
				bodyLines: d,
				line: u,
				functionName: n,
				fileName: i,
				cause: e,
				sourceText: p === void 0 ? void 0 : o,
				startOffset: p,
				endOffset: m
			});
			if (r) {
				r(h);
				return;
			}
			throw h;
		}
	};
}
//#endregion
//#region source/constants/attributeNames.ts
var sn = {
	class: "className",
	for: "htmlFor",
	maxlength: "maxLength",
	colspan: "colSpan",
	rowspan: "rowSpan"
}, cn = [
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"keygen",
	"link",
	"menuitem",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
], ln = [
	"table",
	"tbody",
	"tfoot",
	"thead",
	"tr"
];
function un(e) {
	return cn.indexOf(e.toLowerCase()) === -1;
}
function dn(e) {
	return ln.indexOf(e.toLowerCase()) !== -1;
}
//#endregion
//#region source/helpers/hash.ts
var fn = (e = "", t = 16) => {
	let n = String(e), r = 0;
	return n.split("").forEach((e) => {
		r = (r << 5) - r + e.charCodeAt(0), r &= r;
	}), Math.abs(r).toString(t);
}, pn = () => fn(Math.random().toString()), mn = (e) => e.replace(/([A-Z])([A-Z])/g, "$1 $2").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z\u00C0-\u00ff]/g, " ").toLowerCase().split(" ").filter((e) => e).map((e, t) => t > 0 ? e[0].toUpperCase() + e.slice(1) : e).join(""), hn = (e) => {
	switch (typeof e) {
		case "string": return e.split(";").filter((e) => e).reduce((e, t) => {
			let n = t.slice(0, t.indexOf(":")).trim(), r = t.slice(t.indexOf(":") + 1).trim();
			return {
				...e,
				[mn(n)]: r
			};
		}, {});
		case "object": return e;
		default: return;
	}
}, gn = (e) => e == null || e === "" ? [] : e.split("."), _n = (e, t) => {
	let [n, ...r] = t;
	if (!(e == null || n == null)) return r.length === 0 ? e[n] : _n(e[n], r);
}, vn = (e, t) => _n(e, gn(t));
//#endregion
//#region source/helpers/functionProxy.ts
function yn(e, t) {
	let n = e;
	return n.scope = t, new Proxy(n, { apply: (e, t, n) => Reflect.apply(e, {
		...e.scope,
		...t
	}, n) });
}
//#endregion
//#region source/components/JsxParser.tsx
var bn = 6, xn = class i extends e.Component {
	static displayName = "JsxParser";
	static defaultProps = {
		allowUnknownElements: !0,
		autoCloseVoidElements: !1,
		bindings: {},
		blacklistedAttrs: [/^on.+/i],
		blacklistedTags: ["script"],
		className: "",
		components: {},
		componentsOnly: !1,
		disableFragments: !1,
		disableKeyGeneration: !1,
		fileName: void 0,
		jsx: "",
		onError: () => {},
		renderError: void 0,
		renderInWrapper: !0,
		renderUnrecognized: () => null
	};
	ParsedChildren = null;
	lastAttributeName = void 0;
	jsx = "";
	#e = "";
	#t = 0;
	#n = [];
	#r = (e) => this.jsx.slice(e.start, e.end);
	#i = (e) => {
		let t = this.#r(e).replaceAll("`", "\\`");
		return t.length > 50 ? `${t.slice(0, 47)}...` : t;
	};
	#a = () => this.#n.length ? this.#n[this.#n.length - 1] : void 0;
	#o = (e) => {
		let t = 0;
		return new Proxy(e, { apply: (e, n, r) => {
			let i = t;
			t += 1, this.#n.push(i);
			try {
				return Reflect.apply(e, n, r);
			} finally {
				this.#n.pop();
			}
		} });
	};
	#s = (e) => {
		if (e) switch (e.type) {
			case "Identifier": return e.name;
			case "MemberExpression": return this.#s(e.object);
			case "ChainExpression": return this.#s(e.expression);
			default: return;
		}
	};
	#c = (e, t) => {
		let n = this.#a(), r = this.#e, i = t.start - this.#t, a = t.end - this.#t, { fileName: o, onError: s } = this.props;
		return new Proxy(e, { apply: (e, c, l) => {
			try {
				return Reflect.apply(e, c, l);
			} catch (e) {
				s?.(Xt({
					type: "function-runtime",
					message: e?.message ?? String(e),
					source: r,
					start: i,
					end: a,
					fileName: o,
					cause: e,
					astNode: t,
					loopIndex: n
				}));
				return;
			}
		} });
	};
	#l = (e) => ({
		fileName: this.props.fileName,
		source: this.#r(e),
		location: Yt(this.#e || this.jsx, e.start - this.#t, e.end - this.#t),
		loopIndex: this.#a(),
		astNode: e
	});
	#u = (e, t, n, r) => Xt({
		type: e,
		message: t,
		source: this.#e || this.jsx,
		start: n.start - this.#t,
		end: n.end - this.#t,
		fileName: this.props.fileName,
		cause: r,
		astNode: n,
		loopIndex: this.#a()
	});
	#d = (e) => {
		let t = I.extend(Wt.default({ autoCloseVoidElements: this.props.autoCloseVoidElements })), n = `<root>${e}</root>`;
		this.jsx = n, this.#e = e, this.#t = bn, this.#n = [];
		let r = [];
		try {
			return r = t.parse(n, { ecmaVersion: "latest" }), r = r.body[0].expression.children || [], r.map((e) => this.#f(e)).filter(Boolean);
		} catch (t) {
			let n = typeof t?.pos == "number" ? t.pos - this.#t : 0, r = Xt({
				type: "parse",
				message: Qt(String(t)),
				source: e,
				start: n,
				end: n,
				fileName: this.props.fileName,
				cause: t
			});
			return this.props.onError && this.props.onError(r), this.props.renderError ? this.props.renderError({ error: String(r) }) : null;
		}
	};
	#f = (e, n) => {
		switch (e.type) {
			case "JSXAttribute": return e.value === null ? !0 : (this.lastAttributeName = e.name.name, this.#f(e.value, n));
			case "JSXElement":
			case "JSXFragment": return this.lastAttributeName = void 0, this.#h(e, n);
			case "JSXExpressionContainer": return this.#f(e.expression, n);
			case "JSXText":
				let a = this.props.disableKeyGeneration ? void 0 : pn();
				return this.props.disableFragments ? e.value : /* @__PURE__ */ r(t, { children: e.value }, a);
			case "ArrayExpression":
				let o = [];
				return (e.elements || []).forEach((e) => {
					if ($t(e)) {
						let t = this.#f(e.argument, n);
						t && o.push(...t);
						return;
					}
					let t = this.#f(e, n);
					t !== void 0 && o.push(t);
				}), o;
			case "ArrowFunctionExpression":
				if ((e.async || e.generator) && this.props.onError?.(this.#u("unsupported-function", "Async and generator arrow functions are not supported.", e, /* @__PURE__ */ SyntaxError("Async and generator arrow functions are not supported."))), e.body.type === "BlockStatement") {
					let t = e.params.map((e, t) => {
						switch (e.type) {
							case "Identifier": return e.name;
							case "RestElement": return `...${e.argument.name}`;
							default: return `arg_${t}`;
						}
					}), r = e.params.some((e) => e.type !== "Identifier"), a = r ? `{ return (${this.#r(e)})(${t.join(", ")}); }` : this.#r(e.body), o = this.#t, s = r ? (t) => e.start + (t - 10) - o : (t) => e.body.start + t - o;
					try {
						let [e, r] = an(a, {
							...this.props.bindings,
							...n
						}, (e, t, n, r = 0) => {
							let a = new i(this.props);
							return a.jsx = e, a.#e = this.#e, a.#t = -r, a.#n = this.#n, a.#f(t, n);
						}, s);
						return this.#o(yn(on(t, e, this.lastAttributeName, this.props.onError, this.props.fileName, s, this.#e || this.jsx), {
							...this.props.bindings,
							...n,
							...r
						}));
					} catch (t) {
						this.props.onError?.(this.#u("function-parse", `Unable to parse function \`${this.lastAttributeName ?? this.#i(e)}\` => ${t}.`, e, t));
						return;
					}
				}
				return this.#o((...t) => {
					let r = this.#g(n, e, t);
					return this.#f(e.body, r);
				});
			case "BinaryExpression":
				switch (e.operator) {
					case "-": return this.#f(e.left, n) - this.#f(e.right, n);
					case "!=": return this.#f(e.left, n) != this.#f(e.right, n);
					case "!==": return this.#f(e.left, n) !== this.#f(e.right, n);
					case "*": return this.#f(e.left, n) * this.#f(e.right, n);
					case "**": return this.#f(e.left, n) ** this.#f(e.right, n);
					case "/": return this.#f(e.left, n) / this.#f(e.right, n);
					case "%": return this.#f(e.left, n) % this.#f(e.right, n);
					case "+": return this.#f(e.left, n) + this.#f(e.right, n);
					case "<": return this.#f(e.left, n) < this.#f(e.right, n);
					case "<=": return this.#f(e.left, n) <= this.#f(e.right, n);
					case "==": return this.#f(e.left, n) == this.#f(e.right, n);
					case "===": return this.#f(e.left, n) === this.#f(e.right, n);
					case ">": return this.#f(e.left, n) > this.#f(e.right, n);
					case ">=": return this.#f(e.left, n) >= this.#f(e.right, n);
				}
				return;
			case "CallExpression":
				let s = this.#f(e.callee, n);
				if (s === void 0) {
					this.props.onError?.(this.#u("invocation", `The expression \`${this.#i(e)}\` could not be resolved, resulting in an undefined return value.`, e, /* @__PURE__ */ TypeError(`\`${this.#i(e.callee)}\` is not a function.`)));
					return;
				}
				try {
					let t = e.arguments.map((e) => this.#f(e, n)), r = {
						...this.props.bindings,
						...n
					};
					return Reflect.apply(s, r, t);
				} catch (t) {
					this.props.onError?.(this.#u("call", `Unable to call expression \`${this.#i(e)}\` => ${t}.`, e, t));
					return;
				}
			case "ChainExpression": try {
				return this.#f(e.expression, n);
			} catch (t) {
				this.props.onError?.(this.#u("chain", `Unable to call expression \`${this.#i(e)}\` => ${t}.`, e, t));
				return;
			}
			case "ConditionalExpression": return this.#f(e.test, n) ? this.#f(e.consequent, n) : this.#f(e.alternate, n);
			case "ExpressionStatement": return this.#f(e.expression, n);
			case "Identifier": return n?.[e.name] ?? this.props.bindings?.[e.name] ?? window[e.name];
			case "Literal": return e.value;
			case "LogicalExpression":
				let c = this.#f(e.left, n), l = () => this.#f(e.right, n);
				switch (e.operator) {
					case "||": return c || l();
					case "&&": return c && l();
					case "??": return c ?? l();
					default: return !1;
				}
			case "MemberExpression": return this.#p(e, n);
			case "NewExpression":
				let u = this.#f(e.callee, n);
				if (u === void 0) {
					this.props.onError?.(this.#u("invocation", `The expression \`${this.#i(e)}\` could not be resolved, resulting in an undefined return value.`, e, /* @__PURE__ */ TypeError(`\`${this.#i(e.callee)}\` is not a constructor.`)));
					return;
				}
				return new u(...e.arguments.map((e) => this.#f(e, n)));
			case "ObjectExpression":
				let d = {};
				return e.properties.forEach((e) => {
					if ($t(e)) {
						let t = this.#f(e.argument, n);
						Object.entries(t || {}).forEach(([e, t]) => {
							d[e] = t;
						});
					} else {
						let t = e.key.name || e.key.value;
						d[t] = this.#f(e.value, n);
					}
				}), d;
			case "TemplateElement": return e.value.cooked;
			case "TemplateLiteral": return [...e.expressions, ...e.quasis].sort((e, t) => e.start < t.start ? -1 : 1).map((e) => this.#f(e, n)).join("");
			case "ThisExpression": return this.props.bindings;
			case "UnaryExpression":
				switch (e.operator) {
					case "+": return +this.#f(e.argument, n);
					case "-": return -this.#f(e.argument, n);
					case "!": return !this.#f(e.argument, n);
				}
				return;
		}
	};
	#p = (e, t) => {
		let { object: n } = e, r = (e) => ({
			key: e.computed ? this.#f(e.property, t) : e.property?.name ?? JSON.parse(e.property?.raw ?? "\"\""),
			optional: !!e.optional,
			object: e.object
		}), i = [r(e)];
		if (e.object.type !== "Literal") for (; n && ["MemberExpression", "Literal"].includes(n?.type);) i.unshift(r(n)), n = n.object;
		let a = this.#f(n, t);
		try {
			let e = a, t = !1, n = i.reduce((n, r) => {
				if (!t) {
					if (e = n, n == null) {
						if (r.optional) {
							t = !0;
							return;
						}
						throw TypeError(`Cannot read \`${r.key}\` of \`${this.#i(r.object)}\`, which is ${n === null ? "null" : "undefined"}.`);
					}
					return n[r.key];
				}
			}, a);
			return typeof n == "function" ? n.bind(e) : n;
		} catch (t) {
			this.props.onError?.(this.#u("member-access", `Unable to resolve \`${this.#i(e)}\` => ${t}`, e, t));
		}
	};
	#m = (e) => e.type === "JSXIdentifier" ? e.name : `${this.#m(e.object)}.${this.#m(e.property)}`;
	#h = (n, r) => {
		let { allowUnknownElements: i, components: a, componentsOnly: o, onError: s } = this.props, { children: c = [] } = n, l = n.type === "JSXElement" ? n.openingElement : n.openingFragment, { attributes: u = [] } = l, d = n.type === "JSXElement" ? this.#m(l.name) : "", f = (this.props.blacklistedAttrs || []).map((e) => e instanceof RegExp ? e : new RegExp(e, "i")), p = (this.props.blacklistedTags || []).map((e) => e.trim().toLowerCase()).filter(Boolean);
		if (/^(html|head|body)$/i.test(d)) return c.map((e) => this.#h(e, r));
		let m = d.trim().toLowerCase();
		if (p.indexOf(m) !== -1) return s(this.#u("blacklisted-tag", `The tag \`<${d}>\` is blacklisted, and will not be rendered.`, n, /* @__PURE__ */ Error(`The tag <${d}> is blacklisted.`))), null;
		if (d !== "" && !vn(a, d)) {
			if (o) return s(this.#u("unrecognized-component", `The component \`<${d}>\` is unrecognized, and will not be rendered.`, n, /* @__PURE__ */ ReferenceError(`The component <${d}> is not defined.`))), this.props.renderUnrecognized(d);
			if (!i && document.createElement(d) instanceof HTMLUnknownElement) return s(this.#u("unrecognized-tag", `The tag \`<${d}>\` is unrecognized in this browser, and will not be rendered.`, n, /* @__PURE__ */ ReferenceError(`The tag <${d}> is not a recognized element.`))), this.props.renderUnrecognized(d);
		}
		let h, g = n.type === "JSXElement" ? vn(a, d) : t;
		(g || un(d)) && (h = c.map((e) => this.#f(e, r)), !g && !dn(d) && (h = h.filter((e) => typeof e != "string" || !/^\s*$/.test(e))), h.length === 0 ? h = void 0 : h.length === 1 ? [h] = h : h.length > 1 && !this.props.disableKeyGeneration && (h = h.map((e, t) => e?.type && !e?.key ? {
			...e,
			key: e.key || t
		} : e)));
		let _ = { key: this.props.disableKeyGeneration ? void 0 : pn() };
		u.forEach((e) => {
			if (e.type === "JSXAttribute") {
				let t = e.name.name, n = sn[t] || t, i = this.#f(e, r), a = e.value?.type === "JSXExpressionContainer" ? e.value.expression : void 0, o = this.#s(a);
				typeof i == "function" && o && r && o in r && (i = this.#c(i, e)), f.filter((e) => e.test(n)).length === 0 && (_[n] = i);
			} else if (e.type === "JSXSpreadAttribute") {
				let t = e.argument, n = this.#f(t, r);
				typeof n == "object" && Object.keys(n || {}).forEach((e) => {
					let t = sn[e] || e;
					f.filter((e) => e.test(t)).length === 0 && (_[t] = n[e]);
				});
			}
		}), typeof _.style == "string" && (_.style = hn(_.style)), g && g.injectSourceInfo && (_.sourceInfo = this.#l(n));
		let ee = d.toLowerCase();
		return ee === "option" && (h = h.props.children), e.createElement(g || ee, _, h);
	};
	#g = (e, t, n) => {
		let r = e ?? {};
		return t.params.forEach((t, i) => {
			switch (t.type) {
				case "Identifier":
					r[t.name] = n[i];
					break;
				case "ArrayPattern":
					t.elements.forEach((e, t) => {
						e && e.type === "Identifier" && (r[e.name] = n[i][t]), e && e.type === "RestElement" && e.argument.type === "Identifier" && (r[e.argument.name] = n[i].slice(t));
					});
					break;
				case "ObjectPattern":
					t.properties.forEach((e) => {
						e.type === "Property" && e.key.type === "Identifier" && e.value.type === "Identifier" && (r[e.value.name] = n[i][e.key.name]);
					});
					break;
				case "AssignmentPattern":
					let a = () => this.#f(t.right, e);
					r[t.left.name] = n[i] === void 0 ? a() : n[i];
					break;
				case "RestElement":
					r[t.argument.name] = n.slice(i);
					break;
			}
		}), r;
	};
	render = () => {
		let e = (this.props.jsx || "").trim().replace(/<!DOCTYPE([^>]*)>/g, "");
		this.ParsedChildren = this.#d(e);
		let t = [.../* @__PURE__ */ new Set(["jsx-parser", ...String(this.props.className).split(" ")])].filter(Boolean).join(" ");
		return this.props.renderInWrapper ? /* @__PURE__ */ r("div", {
			className: t,
			children: this.ParsedChildren
		}) : /* @__PURE__ */ r(n, { children: this.ParsedChildren });
	};
};
//#endregion
export { Gt as JsxParserError, xn as default };

//# sourceMappingURL=react-jsx-parser.js.map