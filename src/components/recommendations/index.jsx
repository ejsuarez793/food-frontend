import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { useState } from 'react'
import tw from "twin.macro";
import { play as playIcon } from 'ionicons/icons';

import { 
    IonApp,
    IonToolbar,
    IonButton, 
    IonHeader, 
    IonIcon, 
    IonTitle, 
    IonToast, 
    IonContent,
    IonGrid, IonRow, IonCol
  } from '@ionic/react';

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-green-500
`;

const TableHeader = tw.th`
border
border-green-500
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
border
border-green-500
p-5
`;

export function Recommendations(props) {
    const [recommendations, setRecommentations] = useState([]);

    const fetchRecommendations = async() => {
        const response = await axios.get('https://heroku-food-api.herokuapp.com/recipes/recommendations?days=7')

        if (response) {
            const recommendations = response.data;

            console.log(recommendations)

            /*const day_keys = ['day_0', 'day_1', 'day_2', 'day_3', 'day_4', 'day_5', 'day_6']
            const meal_keys = ['breakfast', 'lunch', 'dinner', 'shake', 'snack']
            var parsed_recommendations = []
            for (let i = 0; i < day_keys.length; i++) {
                for (let j = 0; j < meal_keys.length; j++) {
                    let parsed_recomm
                    parsed_recomm = Object.assign({}, recommendations[day_keys[i]][meal_keys[j]])
                    parsed_recomm['day'] = day_keys[i]
                    parsed_recomm['meal'] = meal_keys[j]

                    parsed_recommendations.push(parsed_recomm)
                }
                    
            }*/


            const day_keys = ['day_0', 'day_1', 'day_2', 'day_3', 'day_4', 'day_5', 'day_6']
            const meal_keys = ['breakfast', 'lunch', 'dinner', 'shake', 'snack']
            var parsed_recommendations = []
            for (let i = 0; i < meal_keys.length; i++) {
                let parsed_recomm
                parsed_recomm = Object.assign({}, {})
                parsed_recomm['meal_type'] = meal_keys[i]
                for (let j = 0; j < day_keys.length; j++) {
                    let name = recommendations[day_keys[j]][meal_keys[i]]['name']
                    let ct = recommendations[day_keys[j]][meal_keys[i]]['cook_time']
                    let wt = recommendations[day_keys[j]][meal_keys[i]]['wash_time']
                    parsed_recomm[day_keys[j]] = `${name} (ct: ${ct}m)(wt: ${wt}m)`
                }
                parsed_recommendations.push(parsed_recomm)
                    
            }


            setRecommentations(parsed_recommendations);
        }
    }

    const recommendationsData = useMemo(() => [...recommendations], [recommendations])
    /*const recommendationsColumns = useMemo(() => ([
        {
            Header: "day",
            accessor: "day"
        },
        {
            Header: "meal",
            accessor: "meal"
        },
        {
            Header: "name",
            accessor: "name"
        },
        {
            Header: "cook_time",
            accessor: "cook_time"
        },
        {
            Header: "wash_time",
            accessor: "wash_time"
        }
    ]), []);*/

    const recommendationsColumns = useMemo(() => ([
        {
            Header: "meal type",
            accessor: "meal_type"
        },
        {
            Header: "day 1",
            accessor: "day_0"
        },
        {
            Header: "day 2",
            accessor: "day_1"
        },
        {
            Header: "day 3",
            accessor: "day_2"
        },
        {
            Header: "day 4",
            accessor: "day_3"
        },
        {
            Header: "day 5",
            accessor: "day_4"
        },
        {
            Header: "day 6",
            accessor: "day_5"
        },
        {
            Header: "day 7",
            accessor: "day_6"
        }
    ]), []);

    const tableInstance = useTable( {columns: recommendationsColumns, data: recommendationsData });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        fetchRecommendations();
    };

    return <IonContent className="ion-padding">
                <IonButton onClick={handleClick}> <IonIcon icon={playIcon} slot="start" /> Obtener Recomendación </IonButton>
                <IonToast isOpen={showToast} message="Hello World!"></IonToast>
                <Table {...getTableProps()}>
                    <TableHead>
                    {headerGroups.map( (headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableHeader {...column.getHeaderProps()}> {column.render("Header")} </TableHeader>
                            ))}
                        </TableRow>
                    ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);

                        return <TableRow {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                            return <TableData {...cell.getCellProps()}> { cell.render("Cell") }</TableData>
                        })}
                        </TableRow>

                    })}
                    </TableBody>
                </Table>
                </IonContent>

}