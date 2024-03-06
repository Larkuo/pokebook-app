import './ListViewCard.css';

interface ListViewCardProps{
    name: string;
    url: string;
}

export function ListViewCard({
    name,
    url,
}:ListViewCardProps) {
    return (
        <div className='list-view-card'>
            Pokemon {name}: {url}
        </div>
    );
}
