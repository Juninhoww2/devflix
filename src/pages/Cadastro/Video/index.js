import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../template/DefaultPage';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/Video';
import categoryRepository from '../../../repositories/Categoria';
import Form from '../../../components/Form/index';

export default function CadastroVideo() {
	const history = useHistory();
	const [categories, setCategories] = useState([]);
	const categoryTitles = categories.map(({ title }) => title);
	const { handleChange, values } = useForm({
		title: '',
		url: '',
		category: '',
	});

	useEffect(() => {
		categoryRepository.getAll().then((categoriasFromServer) => {
			setCategories(categoriasFromServer);
		});
	}, []);

	function handleSubmit(e) {
		e.preventDefault();

		const chosenCategory = categories.find((category) => {
			return category.title === values.category;
		});

		videosRepository
			.create({
				titulo: values.title,
				url: values.url,
				categoriaId: chosenCategory.id,
			})
			.then(() => {
				console.log('Cadastrado');
				history.push('/');
			});
	}

	return (
		<PageDefault>
			<Form onSubmit={handleSubmit}>
				<h1>Cadastro de vídeos</h1>
				<FormField
					label="Título do Vídeo"
					name="title"
					value={values.title}
					onChange={handleChange}
				/>
				<FormField
					label="URL"
					name="url"
					value={values.url}
					onChange={handleChange}
				/>
				<FormField
					label="Categoria"
					name="category"
					value={values.category}
					onChange={handleChange}
					suggestions={categoryTitles}
				/>

				<Button type="submit">Cadastrar</Button>
			</Form>

			<Link to="/">Ir para home</Link>
		</PageDefault>
	);
}