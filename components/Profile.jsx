import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 mb-10 grid w-screen xl:w-[80vw] max-sm:grid-1 sm:grid-cols-2  lg:grid-cols-3 place-items-center gap-5">
        {data.map((item) => (
          <PromptCard
            key={item._id}
            post={item}
            handleDelete={() => handleDelete && handleDelete(item)}
            handleEdit={() => handleEdit && handleEdit(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
