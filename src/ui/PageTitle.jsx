import PropTypes from "prop-types";

const PageTitle = ({
  title = "Page Title",
  subTitle = "",
  titleSize = "text-4xl",
  children,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-2.5">
      <h1 className={`font-bold text-primary ${titleSize}`}>
        {title}
      </h1>

      {subTitle && (
        <p className="text-lg text-gray-500">
          {subTitle}
        </p>
      )}
      
      {children}
    </div>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  titleSize: PropTypes.string,
  children: PropTypes.node,
};

export default PageTitle;