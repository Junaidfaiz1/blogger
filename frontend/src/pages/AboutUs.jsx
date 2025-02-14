import React from 'react';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto bg-gray-200 shadow-inner rounded-lg mt-4 mb-4" style={{ boxShadow: "12px 12px 24px #bebebe, -12px -12px 24px #ffffff" }}>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8" style={{ textShadow: "2px 2px 4px #d1d1d1" }}>About Us</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Our Mission</h2>
                <p className="text-gray-700 leading-relaxed" style={{ background: "#f0f0f0", borderRadius: "12px", padding: "16px", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}>
                    Welcome to our multi-user blogging platform! Our mission is to create a space where writers, creators, and thinkers can share their voices and connect with a community that values diverse perspectives. We believe in empowering individuals to express their ideas and inspire others.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Who We Are</h2>
                <p className="text-gray-700 leading-relaxed" style={{ background: "#f0f0f0", borderRadius: "12px", padding: "16px", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}>
                    We are a passionate team of developers, writers, and innovators dedicated to building a platform that bridges creativity with technology. Whether you are a seasoned blogger or just starting, our platform provides the tools and resources to bring your stories to life.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>What We Offer</h2>
                <ul className="list-disc list-inside text-gray-700" style={{ background: "#f0f0f0", borderRadius: "12px", padding: "16px", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}>
                    <li>Easy-to-use interface for creating and managing blogs.</li>
                    <li>Customizable themes to showcase your unique style.</li>
                    <li>Collaborative features for team blogging.</li>
                    <li>Comprehensive analytics to track your growth.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ textShadow: "1px 1px 3px #d1d1d1" }}>Join Our Community</h2>
                <p className="text-gray-700 leading-relaxed" style={{ background: "#f0f0f0", borderRadius: "12px", padding: "16px", boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}>
                    Become a part of our growing community of bloggers. Share your knowledge, connect with like-minded individuals, and make your mark in the blogging world. Whether your passion is technology, lifestyle, education, or anything in between, there's a place for you here.
                </p>
            </section>

            <div className="text-center mt-8">
                <Link to={"/SignUp"}
                    type="button"
                    className="px-8 py-3 text-lg font-medium rounded-md shadow"
                    style={{
                        color: "#fff",
                        background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
                        boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.boxShadow = "4px 4px 8px #ffffff, -4px -4px 8px #bebebe"}
                    onMouseOut={(e) => e.currentTarget.style.boxShadow = "4px 4px 8px #bebebe, -4px -4px 8px #ffffff"}
                >
                    Start Blogging Today
                </Link>
            </div>
        </div>
    );
};

export default AboutUsPage;
