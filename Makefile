website:
	@cd frontend
	@echo "Building website..."
	@npm run build
	@echo "Website built successfully!"
	@echo "Copying website to server..."
	@aws s3 sync ./ s3://iot-platform-website --delete