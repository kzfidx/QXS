var token = "e03510c6fccc76decc0303855da55508f1caa6af";
//https://aqicn.org/data-platform/token/ 獲取token
var city ="here"
//https://aqicn.org/city/all 

function aqi(){
	let qurl = {
		url: "https://api.waqi.info/feed/" + city + "/?token=" + token, headers: {},
	};
	$task.fetch(qurl).then(response => {
		var obj = JSON.parse(response.body);
		info = obj.data.aqi;
		SyncTime = obj.data.time.s;
		if (info<50){text = "🟢，良好\n空氣質量非常令人滿意，不存在空氣污染問題，對公眾的健康沒有危害。"
		}	else if (info<100){text = "🟡，中等\n空氣狀況基本可接受，除極少數對某種污染物特別敏感的人群以外，對公眾健康沒有危害。"
		}	else if (info<150){text = "🟠，對敏感人群有害\n空氣輕微污染，對污染物比較敏感的人群，例如兒童和老年人、呼吸道疾病或心臟病患者，他們健康狀況會受到影響，但對健康人群基本沒有影響。"
		}	else if (info<200){text = "🔴，不健康!\n空氣輕度污染，幾乎所有人的健康都會受到影響。進一步加劇易感人群症狀，可能對健康人群心臟、呼吸系統有影響。兒童、老年人及心臟病、呼吸系統疾病患者避免長時間、高強度的戶外鍛練,一般人群適量減少戶外運動。"
		}	else if (info<300){text = "🟣，極不健康!\n空氣中度污染，每個人的健康都會受到比較嚴重的影響。兒童、老年人和心臟病、肺病患者應停留在室內，停止戶外運動，一般人群減少戶外運動。"
		}	else {text = "🟤，有毒害!\n空氣重度污染，所有人的健康都會受到極為嚴重的影響。健康人群運動耐受力降低，有明顯強烈症狀，提前出現某些疾病。兒童、老年人和病人應當留在室內，避免體力消耗，一般人群應避免戶外活動。"
		}
		$notify("AQIcn.org", "截至" + SyncTime, "當前位置AQI：" + info + text);
	}, reason => {
	$notify("AQIcn.org 信息获取失败", reason.error);
	});
}
aqi()