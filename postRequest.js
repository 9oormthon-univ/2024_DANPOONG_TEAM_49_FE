const http = require('http');

const postData = JSON.stringify({
    code: 'ols5BQqW66SkeURgW9RRJvs-dg2ymM7RAAAAAQo8JJoAAAGTWOUFga-b-4epDDEo'
});

const options = {
    hostname: '54.180.75.157',
    port: 8080,
    path: '/api/auth/token/save',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';

    // 서버로부터 데이터를 수신
    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    // 응답이 완료되면 실행
    res.on('end', () => {
        console.log('응답 데이터:', responseBody); // 응답 JSON 출력
        try {
            const parsedData = JSON.parse(responseBody);
            console.log('액세스 토큰:', parsedData.access_token); // 액세스 토큰 추출
        } catch (error) {
            console.error('JSON 파싱 오류:', error);
        }
    });
});

// 요청 에러 핸들링
req.on('error', (e) => {
    console.error(`문제가 발생했습니다: ${e.message}`);
});

// 요청 데이터 전송
req.write(postData);
req.end();
