import React, { Suspense, lazy, useState } from "react";
const RelatedPosts = lazy(() => import("../componants/RelatedPosts"));

const Single = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/50", // Placeholder image for user
      message: "Great blog post! Very informative and well-written.",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/50", // Placeholder image for user
      message: "Thanks for sharing this. It was very helpful!",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newComment = {
        id: comments.length + 1,
        name: "Logged-in User", // Replace with logged-in user's name
        avatar: "https://via.placeholder.com/50", // Replace with logged-in user's avatar
        message: newMessage,
      };
      setComments([...comments, newComment]);
      setNewMessage("");
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      {/* Blog Content */}
      <div className="lg:w-3/4 w-full bg-gray-200 rounded-xl p-6 shadow-xl flex flex-col">
        {/* Full-width Blog Image with Increased Height */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq1ibNzaZN83--bmwWByeWv6Uzbnjgbh5m_g&s"
          alt="Blog Banner"
          className="w-full h-96 object-cover rounded-lg shadow-inner mb-6"
        />

        {/* Author Information */}
        <div className="flex items-center mt-4 bg-gray-200 p-4 rounded-xl shadow-inner">
          <img
            src="https://via.placeholder.com/50"
            alt="Author Profile"
            className="w-16 h-16 rounded-full border-4 border-gray-300 shadow-md"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800">Author Name</h2>
            <p className="text-gray-500">Published 3 hours ago</p>
          </div>
        </div>

        {/* Article Content */}
        <article className="mt-6 text-gray-800">
          <h1 className="text-3xl font-bold mb-4">Blog Title</h1>
          <p className="leading-relaxed mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim recusandae atque quod praesentium deserunt quae autem ea. Iure, accusamus corrupti magni, vero earum delectus soluta id expedita quam debitis officia facilis ab temporibus rem consequatur eaque. Architecto ipsum hic quaerat consequuntur dolorem recusandae doloribus, cumque nobis quisquam exercitationem voluptates quod suscipit adipisci dolorum, omnis voluptatem incidunt molestiae! Saepe eum modi culpa, magni voluptatibus velit voluptatum labore! Pariatur error minima laborum? Sequi totam sit, fuga quo quisquam deleniti distinctio soluta architecto. Perferendis molestiae iure iste sed illo beatae repudiandae incidunt error dignissimos dolore ullam expedita pariatur sint sit enim corrupti, ducimus quam quasi! Maiores dolor hic minus dolorum suscipit quam tenetur quae reprehenderit necessitatibus? Sapiente corrupti quam dolorem praesentium voluptatibus, eveniet ratione veniam? Deserunt, rem. Reiciendis harum earum voluptatem voluptates iste tempora nobis, modi tenetur! Beatae et, ea quisquam, maxime doloremque nobis laboriosam in quaerat iure suscipit commodi! Quam ipsum atque ullam, iste doloremque eligendi libero dolore alias dolores at id harum nam cum, veniam amet corrupti nihil vel quas omnis nisi cupiditate dignissimos. Vitae consectetur nulla blanditiis maxime esse, harum expedita quas quibusdam veritatis, provident ullam distinctio dolores aperiam aliquam sit enim soluta exercitationem laudantium incidunt aliquid consequatur ab fugiat recusandae neque! Impedit repellat incidunt fuga dignissimos sit numquam, quod temporibus cum vitae tenetur, suscipit eveniet quaerat accusamus autem quae laudantium voluptatum aspernatur officiis eos! Reprehenderit animi esse in sed sunt ab inventore sapiente voluptas, tenetur ratione, minus tempora temporibus, sequi aliquam aspernatur unde? Iusto mollitia soluta aut aliquam fugiat esse ducimus eius ipsum, fuga sequi optio veniam numquam quia maiores expedita quos quod adipisci, ipsa nemo porro harum, natus dolor explicabo! Facere exercitationem, quae quaerat debitis quas veniam voluptate dolorum. Exercitationem neque fugit soluta fugiat asperiores numquam placeat iusto at doloribus quia tenetur ex laboriosam architecto quod pariatur, qui facilis! Nobis laborum soluta, quidem unde cum a amet. Sint porro vero expedita. Aliquam possimus odit numquam pariatur unde doloribus quod eveniet deleniti est quae, a iure. Dolorem tenetur error repellendus quo provident! Quibusdam, nihil, natus laborum obcaecati dolores tempora rerum similique iste, voluptate ipsum aliquam ad commodi modi perspiciatis maxime consectetur hic animi dolore. Eligendi, neque exercitationem corrupti consequuntur accusantium fugit dolorem molestiae delectus. Minima tenetur quod iusto natus harum reprehenderit quaerat cupiditate incidunt accusamus commodi dolorum ut, autem nisi! Culpa at vitae quisquam nisi amet. Neque repellat consectetur harum non tempora provident, officiis necessitatibus eligendi autem similique optio doloremque minus amet cumque accusamus possimus ipsam quo sequi, odit itaque distinctio facilis. Nemo ullam ex cupiditate quas? Commodi animi iste quo sed dolores, assumenda aut culpa exercitationem quos earum sunt id. Praesentium excepturi quisquam molestias provident. Earum eos qui dolorem rerum distinctio unde iure optio atque iusto ad possimus enim, sed modi architecto mollitia inventore saepe sapiente totam ratione. Illo, esse dignissimos facilis voluptatem incidunt molestias provident deserunt nulla nobis dolore veritatis suscipit magnam? Voluptatum dolorem tempora quis id commodi praesentium, voluptate at maxime saepe eius repellat consectetur quae quaerat molestiae, provident iusto ab magnam amet cumque laboriosam doloribus!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi a recusandae adipisci vel laudantium possimus error nihil quae perspiciatis, temporibus expedita impedit voluptate eaque sunt praesentium ducimus pariatur obcaecati nostrum non minus voluptates sed? Expedita dolorem fugit cum quos quod laborum, nobis beatae magni? Expedita sint, earum iusto quam consectetur nihil sit...
          </p>
        </article>

        {/* Comment Section */}
        <div className="mt-8 bg-gray-300 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave a Comment</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Message Field */}
            <div>
              <textarea
                placeholder="Write your message here..."
                rows="4"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-700"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full p-3 bg-gray-400 text-white font-medium rounded-lg shadow-lg hover:bg-gray-500 transition-all"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Display Existing Comments */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Comments</h3>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start p-4 bg-gray-200 rounded-lg shadow-inner"
                >
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                    className="w-12 h-12 rounded-full shadow-md"
                  />
                  <div className="ml-4">
                    <h4 className="text-gray-800 font-medium">{comment.name}</h4>
                    <p className="text-gray-600 text-sm">{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Sidebar */}
      <Suspense fallback={"Loading..."}>
        <div className="lg:w-1/4 w-full mt-8 lg:mt-0 lg:ml-8 bg-gray-200 rounded-xl p-6 shadow-xl">
          <RelatedPosts />
        </div>
      </Suspense>
    </div>
  );
};

export default Single;
