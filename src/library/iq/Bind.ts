import { XMLWriter } from '../xml/XMLWriter';
import { XMLReader } from '../xml/XMLReader';
import { JID, JIDHelper } from '../util/jid';
import { IqRequest, IqResponse, IqBase } from './IqBase';

export interface BindRequest extends IqRequest {
    id: string;
    resource?: string;
}

export interface BindResponse extends IqResponse {
    id: string;
    jid: JID;
}

export class Bind extends IqBase {

    public static readonly BIND_XMLNS = 'urn:ietf:params:xml:ns:xmpp-bind';

    public createResponse(response: BindResponse): XMLWriter {
        return XMLWriter.create()
            .element('iq', XMLWriter.create()
                .attr('type', 'result')
                .attr('id', response.id)
                .attr('to', response.jid.host + '/' + response.jid.resource)
                .element('bind', XMLWriter.create()
                    .xmlns('', 'urn:ietf:params:xml:ns:xmpp-bind')
                    .element('jid', XMLWriter.create().text(JIDHelper.toString(response.jid)))
                )
            )
    }

    public isRequest(request: XMLReader): boolean {
        return this.isIq(request, 'set', 'bind', Bind.BIND_XMLNS);
    }

    public readRequest(request: XMLReader): BindRequest {
        const bind = this.readData(request, 'bind');
        const resource = bind.getElement('resource') != null ? bind.getElement('resource').getContent() : null;
        return {
            id: this.readId(request),
            resource: resource,
        };
    }
}
