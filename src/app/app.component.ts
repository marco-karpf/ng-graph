import {Node, Layout, DagreNodesOnlyLayout} from '@swimlane/ngx-graph';
import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-graph';
  public layout: Layout = new DagreNodesOnlyLayout();
  private isMouseOverNode = false;
  private dialogRef: MatDialogRef<DialogComponent> | undefined;
  private lastClickedNode: Node | undefined;
  private previousClickedNode: Node | undefined;
  public isAddable = false;
  public isRemovable = false;

  constructor(private dialog: MatDialog) {
  }

  public showNodeName(event: MouseEvent, node: Node): void {
    const nodeName = node.label;
    const text = node.data.text;
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {nodeName, text},
      panelClass: 'dialog-container'
    });
  }

  public hideNodeName(): void {
    this.isMouseOverNode = false;
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public activateAddLink(): void {
    this.isAddable = true;
  }

  public activateRemoveLink(): void {
    this.isRemovable = true;
  }

  public addLink(event: MouseEvent, node: Node): void {
    if (this.isAddable) {
      if (!this.lastClickedNode) {
        this.lastClickedNode = node;
      } else if (this.lastClickedNode.id !== node.id) {
        const linkId = this.links.length + 1;
        this.links.push({
          id: '`link-' + linkId + '`',
          source: this.lastClickedNode.id,
          target: node.id,
          label: this.lastClickedNode.label + ' - ' + node.label
        });
        this.nodes = [...this.nodes];
        this.previousClickedNode = node;
        this.lastClickedNode = undefined;
        this.isAddable = false;

      }
    }
  }

  public removeLink(event: MouseEvent, node: Node): void {
    if (this.isRemovable) {
      if (!this.lastClickedNode) {
        this.lastClickedNode = node;
      } else if (this.lastClickedNode.id !== node.id) {
        const linkIndex = this.links.findIndex(
          (link) =>
            (link.source === this.lastClickedNode?.id && link.target === node.id) ||
            (link.source === node.id && link.target === this.lastClickedNode?.id)
        );
        if (linkIndex !== -1) {
          this.links.splice(linkIndex, 1);
          this.nodes = [...this.nodes];
          this.previousClickedNode = node;
          this.lastClickedNode = undefined;
          this.isRemovable = false;

        }
      }
    }
  }

  public refresh(): void {
    this.nodes = [...this.nodes];
  }

  vpns = [
    {
      id: 'vpn-1',
      label: 'VPN Corproot 1',
      data: {
        type: 'vpn',
        text: 'Why do programmers prefer dark mode? Because light attracts bugs.'
      },
    }, {
      id: 'vpn-2',
      label: 'VPN Tomato ',
      data: {
        type: 'vpn',
        text: 'Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.'
      },
    },
  ];
  sites = [
    {
      id: 'site-1',
      label: 'Site  1',
      data: {
        type: 'site',
        text: 'Why did the programmer quit his job? He didnt get arrays.'
      },
    }, {
      id: 'site-2',
      label: 'Site 2 ',
      data: {
        type: 'site',
        text: 'Why do programmers prefer cooking at home? Because they dont like using the fork() system call'
      },
    },
  ];
  switches = [
    {
      id: 'switch-1',
      label: 'Switch 1',
      data: {
        type: 'switches',
        text: 'Why did the programmer go broke? He used up all his cache.'
      },
    }, {
      id: 'switch-2',
      label: 'Switch 2 ',
      data: {
        type: 'switches',
        text: 'Why do Java developers wear glasses? Because they can\'t C#.'

      },
    },
  ];
  access_points = [
    {
      id: 'access-point-1',
      label: 'Access Point 1',
      data: {
        type: 'access-point',
        text: 'Why dont programmers like nature? Because it has too many bugs.'
      },
    }, {
      id: 'access-point-2',
      label: 'Access Point 2 ',
      data: {
        type: 'access-point',
        text: 'What do you call a programmer who doesnt comment their code? A code-breaker.'
      },
    },
  ];
  vlan = [
    {
      id: 'vlan-1',
      label: 'Vlan 1',
      data: {
        type: 'vlan',
        text: 'Why did the programmer get stuck in the shower? He forgot to condition his hair.'
      },
    }, {
      id: 'vlan-2',
      label: 'Vlan 2 ',
      data: {
        type: 'vlan',
        text: 'Why do programmers always mix up "Christmas" and "Xmas"? Because they always try to optimize everything.'
      },
    }, {
      id: 'vlan-3',
      label: 'Vlan 3',
      data: {
        type: 'vlan',
        text: 'Why do programmers prefer dark chocolate? Because its bitter, just like their code reviews.'
      },
    },
  ];
  wlan = [
    {
      id: 'wlan-1',
      label: 'Wlan 1',
      data: {
        type: 'wlan',
        text: 'Why did the programmer quit smoking? Because he didnt want to keep hacking.'
      },
    },
  ];
  links = [
    {
      id: 'link-1',
      source: 'site-1',
      target: 'vpn-1',
      label: 'site-1-vpn-1',
    },
    {
      id: 'links-2',
      source: 'vpn-1',
      target: 'vpn-2',
      label: 'vpn-1-vpn-2',
    },
    {
      id: 'links-3',
      source: 'site-1',
      target: 'switch-1',
      label: 'site-1-switch-1',
    },
    {
      id: 'links-4',
      source: 'site-1',
      target: 'vlan-1',
      label: 'site-1-vlan-1',
    },
    {
      id: 'links-5',
      source: 'vlan-1',
      target: 'vlan-2',
      label: 'vlan-1-vlan-2',
    },
    {
      id: 'links-5',
      source: 'vlan-2',
      target: 'vlan-3',
      label: 'vlan-2-vlan-3',
    },
    {
      id: 'links-6',
      source: 'vlan-3',
      target: 'vpn-2',
      label: 'vlan-3-vpn-2',
    },
    {
      id: 'links-7',
      source: 'vpn-2',
      target: 'site-2',
      label: 'vpn-2-site-2',
    },
    {
      id: 'links-8',
      source: 'site-2',
      target: 'access-point-1',
      label: 'site-1-access-point-1',
    },
    {
      id: 'links-9',
      source: 'site-2',
      target: 'access-point-2',
      label: 'site-1-access-point-2',
    },
    {
      id: 'links-10',
      source: 'site-2',
      target: 'switch-2',
      label: 'site-2-switch-2',
    },
    {
      id: 'links-11',
      source: 'site-2',
      target: 'wlan-1',
      label: 'site-1-wlan-1',
    },
  ];

  colorMap: { [key: string]: string } = {
    'green': '#00FF00',
    'blue': '#0000FF',
    'orange': '#FFA500',
    'yellow': '#FFFF00',
    'red': '#FF0000',
    'white': '#FFFFFF',
  }
  nodes: Node[] = this.vpns.concat(this.sites, this.switches, this.access_points, this.vlan, this.wlan);

}
