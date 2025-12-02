# MrPartyDude
 
A small party chat application in which you can chat with your friends while you keep track on how drunk you are. The application is written in Angular with a .NET application backend using SignalR for the chat.

## Technology Stack

- **Frontend**: Angular 20 (non-standalone architecture)
- **Backend**: .NET 10.0
- **Real-time Communication**: SignalR
- **UI Framework**: Bootstrap 5

## Development

### Prerequisites
- .NET 10.0 SDK
- Node.js 20+
- npm 10+

### Building the Application

1. Restore .NET dependencies:
   ```bash
   dotnet restore
   ```

2. Install Angular dependencies:
   ```bash
   cd ClientApp
   npm install
   ```

3. Build the Angular app:
   ```bash
   cd ClientApp
   npm run build
   ```

4. Build the .NET application:
   ```bash
   dotnet build
   ```

### Running the Application

```bash
dotnet run
```

The application will start on http://localhost:5000

## SignalR Integration

SignalR is used for real-time chat functionality. The hub endpoint is available at `/MessageHub`.
