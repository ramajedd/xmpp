import { TcpServer } from "./xmpp/server/TcpServer";
import { XMPPServer } from "./xmpp/server/XMPPServer";
import { OpenStreamHandler } from "./xmpp/stream/OpenStreamHandler";
import { InstructionHandler } from "./xmpp/stream/InstructionHandler";
import { CloseStreamHandler } from "./xmpp/stream/CloseStreamHandler";
import { NonSASLAuthenticationHandler } from "./xmpp/xep/0078/NonSASLAuthenticationHandler";
import { PlainAuthHandler } from "./xmpp/auth/PlainAuthHandler";
import { BindHandler } from "./xmpp/iq/BindHandler";
import { SessionHandler } from "./xmpp/iq/SessionHandler";

const server = new XMPPServer()

server
    .registerServer(new TcpServer())
    //.registerServer(new TcpsServer())
    .addHandler(new OpenStreamHandler())
    .addHandler(new CloseStreamHandler())
    .addHandler(new InstructionHandler())
    .addHandler(new PlainAuthHandler())
    .addHandler(new BindHandler())
    .addHandler(new SessionHandler())
    .addHandler(new NonSASLAuthenticationHandler())

server.start().then(() => {
    console.log('Server started');
});

/*import { XMLReader, XMLStreamReader } from "../library";
const reader = new XMLStreamReader();
reader.append('<test asd="dsa"></test>')
console.log(reader.getContent());*/
