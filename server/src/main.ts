import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/util/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
dotenv.config();

async function bootstrap() {
	const corsOptions = {
		origin: [
			'https://localhost:3000',
			'http://localhost:3000',
			'https://www.comong.kr',
			'https://test.comong.kr',
			'https://comong.kr',
			'https://api.comong.kr',
			'https://dev1.comong.kr',

		],
		methods: 'GET,OPTIONS,PUT,PATCH,POST,DELETE',
		allowedHeaders: ['Content-Type', 'Authorization'],
		transports: ['websocket', 'polling'],
		exposedHeaders: ['Content-Type'],
		credentials: true,
	};
	const validationPipeOptions = {
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		disableErrorMessages: false,
	};

	const cspOptions = {
		directives: {
			// 기본 옵션 설정
			...helmet.contentSecurityPolicy.getDefaultDirectives(),

			// 폰트 관련 설정
			'font-src': ["'self'", 'cdn.jsdelivr.net', 'fonts.gstatic.com', 'cdn.rawgit.com', "'unsafe-inline'"],

			// 사용되는 리소스들에 대한 화이트리스트 설정
			'img-src': ["'self'", 'data:', 'imagedelivery.net'],
			'style-src': [
				"'self'",
				"'unsafe-inline'",
				'cdn.rawgit.com',
				'spoqa.github.io',
				'cdn.jsdelivr.net',
			],
		},
	};

	if (
		fs.existsSync('./secrets/comong.key.pem') &&
		fs.existsSync('./secrets/comong.crt.pem') &&
		fs.existsSync('./secrets/comong.chain.pem')
	) {
		const httpsOptions = {
			key: fs.readFileSync('./secrets/comong.key.pem', 'utf8'),
			cert: fs.readFileSync('./secrets/comong.crt.pem', 'utf8'),
			ca: fs.readFileSync('./secrets/comong.chain.pem', 'utf-8')
		};
		const app = await NestFactory.create<NestExpressApplication>(AppModule, {
			httpsOptions,
			logger: ['error', 'warn', 'log', 'debug', 'verbose'],
		});
		app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
		app.enableCors(corsOptions);
		app.use(cookieParser());
		app.use(
			helmet({
				contentSecurityPolicy: cspOptions,
				crossOriginResourcePolicy: { policy: 'cross-origin' },
			}),
		);
		setupSwagger(app);
		await app.listen(443);
		console.log(`https server runnning on port 443`);
	} else {
		const app = await NestFactory.create<NestExpressApplication>(AppModule, {
			logger: ['error', 'warn', 'log', 'debug', 'verbose'],
		});
		app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
		app.enableCors(corsOptions);
		app.use(cookieParser());
		app.use(
			helmet({
				contentSecurityPolicy: cspOptions,
				crossOriginResourcePolicy: { policy: 'cross-origin' },
			}),
		);
		setupSwagger(app);
		await app.listen(80);
		console.log(`http server runnning on port 80`);
	}
}
bootstrap();