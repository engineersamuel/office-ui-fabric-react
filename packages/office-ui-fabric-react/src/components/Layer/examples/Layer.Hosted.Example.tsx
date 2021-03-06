import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Layer, LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import './Layer.Example.scss';
import * as exampleStylesImport from 'office-ui-fabric-react/lib/common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

export class LayerHostedExample extends React.Component<
  {},
  {
    showLayer: boolean;
    showLayerNoId: boolean;
    showHost: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showLayer: false,
      showLayerNoId: false,
      showHost: true
    };
  }

  public render(): JSX.Element {
    const { showLayer, showLayerNoId, showHost } = this.state;
    const content = <div className={'LayerExample-content ' + AnimationClassNames.scaleUpIn100}>This is example layer content.</div>;

    return (
      <div>
        <Toggle label="Show host" checked={showHost} onChange={this._onChangeToggle} />

        {showHost && <LayerHost id="layerhost1" className="LayerExample-customHost" />}

        <p id="foo">
          In some cases, you may need to contain layered content within an area. Create an instance of a LayerHost along with an id, and
          provide a hostId on the layer to render it within the specific host. (Note that it's important that you don't include children
          within the LayerHost. It's meant to contain Layered content only.)
        </p>

        <Checkbox
          className={exampleStyles.exampleCheckbox}
          label="Render the box below in a Layer and target it at hostId=layerhost1"
          checked={showLayer}
          onChange={this._onChangeCheckbox}
        />

        {showLayer ? (
          <Layer
            hostId="layerhost1"
            onLayerDidMount={this._log('didmount')}
            onLayerWillUnmount={this._log('willunmount')}
            className={'exampleLayerClassName'}
          >
            {content}
          </Layer>
        ) : (
          content
        )}

        <div className="LayerExample-nonLayered">I am normally below the content.</div>

        <p>If you do not specify a hostId then the hosted layer will default to being fixed to the page by default.</p>

        <Checkbox
          className={exampleStyles.exampleCheckbox}
          label="Render the box below in a Layer without specifying a host, fixing it to the top of the page"
          checked={showLayerNoId}
          onChange={this._onChangeCheckboxNoId}
        />

        {showLayerNoId ? (
          <Layer onLayerDidMount={this._log('didmount')} onLayerWillUnmount={this._log('willunmount')}>
            {content}
          </Layer>
        ) : (
          content
        )}
      </div>
    );
  }

  private _log(text: string): () => void {
    return (): void => {
      console.log(text);
    };
  }

  private _onChangeCheckbox = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void => {
    this.setState({ showLayer: checked });
  };

  private _onChangeCheckboxNoId = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void => {
    this.setState({ showLayerNoId: checked });
  };

  private _onChangeToggle = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ showHost: checked });
  };
}
