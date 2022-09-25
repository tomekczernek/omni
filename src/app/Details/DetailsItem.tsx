type Item = {
  id: string;
  name: string;
};

type Props = {
  name: string;
  items?: Item | Item[];
  images?: string[];
  video?: string;
  type?: "image" | "video";
};

export function DetailItem(props: Props) {
  const { name, items, images, video, type } = props;

  const getContent = () => {
    if (type === "image") {
      return images?.map((item) => (
        <img className="details-img" key={item} src={item} alt="image" />
      ));
    }
    if (type === "video") {
      return (
        <a className="details-link" href={video} target="_blank">
          {video}
        </a>
      );
    }
    return (
      <ul>
        {Array.isArray(items) ? (
          items.map((item) => <li key={item.id}>{item.name}</li>)
        ) : (
          <li>{items.name}</li>
        )}
      </ul>
    );
  };

  return (
    <div className="details-item">
      <p className="details-header">{name}</p>
      {getContent()}
    </div>
  );
}
