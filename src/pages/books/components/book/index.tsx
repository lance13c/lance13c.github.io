import * as React from 'react';
// import moment from 'moment';

export interface BookProps {
	title: string;
	author: string;
	description: string;
	date: string;
}

const Book: React.SFC<BookProps> = () => {
	return <div />;
};

export default Book;
