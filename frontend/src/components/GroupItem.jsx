import React, { PureComponent } from 'react';
import { removeGroup, switchOffGroup, switchOnGroup } from '../api';

export default class GroupItem extends PureComponent {
    handleDelete = async () => {
        const {group, onUpdate} = this.props;

        await removeGroup(group.id);
        onUpdate();
    };

    handleStateChange = async (e) => {
        const {group, onUpdate} = this.props;
        const newState = e.target.value;
    
        if (newState === 'on') {
            await switchOnGroup(group.id);
        } else {
            await switchOffGroup(group.id);
        }

        onUpdate();
    };

    render() {
        const { index, group } = this.props;

        return (
            <tr key={group.id}>
                <th scope="row">{index}</th>
                <td>{group.name}</td>
                <td className="text-right">
                    <div className="btn-group mr-4" role="group">
                        <div className="btn-group btn-group-toggle mr-2" role="group" data-toggle="buttons">
                        <label className={`btn btn-outline-primary ${group.state === 'on' ? 'active' : ''}`}>
                            <input type="radio"
                                   name="state"
                                   id="on"
                                   autoComplete="off"
                                   onChange={this.handleStateChange}
                                   value="on"
                                   checked={group.state === 'on'}/> On
                        </label>

                        <label className={`btn btn-outline-primary ${group.state === 'off' ? 'active' : ''}`}>
                            <input type="radio"
                                   name="state"
                                   id="off"
                                   autoComplete="off"
                                   onChange={this.handleStateChange}
                                   value="off"
                                   checked={group.state === 'off'}/> Off
                        </label>
                    </div>
                    </div>

                    <div className="btn-group" role="group">
                        <a href={`#/groups/log/${group.id}`} className="btn btn-outline-secondary">Log</a>
                        <a href={`#/groups/edit/${group.id}`} className="btn btn-outline-secondary">Edit</a>
                        <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    }
}

GroupItem.defaultProps = {
    onUpdate: () => {}
};