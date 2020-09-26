import React, { Component } from 'react';

class TaskListTable extends Component {
    render() {
        return (
            <table>
                <TableHeader />
                <TableBody />
            </table>
        );
    }
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <td>Status</td>
                <td>Descricao</td>
                <td>Data</td>
                <td>Acoes</td>
            </tr>
        </thead>
    )
}

const TableBody = () => {
    return (
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>

    )
}

export default TaskListTable;