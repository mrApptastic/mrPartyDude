using Microsoft.AspNetCore.SignalR;
using mrPartyDude.Models;
using System.Threading.Tasks;  

namespace mrPartyDude.Hubs  
{  
    public class MessageHub : Hub  
    {  
        public async Task NewMessage(Message msg)  
        {  
            await Clients.All.SendAsync("MessageReceived", msg);  
        }  
    }  
}  