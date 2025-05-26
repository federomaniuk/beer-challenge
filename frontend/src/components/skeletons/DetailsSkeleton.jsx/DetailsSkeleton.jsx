import "./DetailsSkeleton.scss";

const DetailsSkeleton = () => {
  return (
    <div className="details-skeleton">
      <div className="details-skeleton__image" />
      <div className="details-skeleton__body">
        <div className="details-skeleton__body-content" />
      </div>
    </div>
  );
};

export default DetailsSkeleton;
